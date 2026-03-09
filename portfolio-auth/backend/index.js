


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {registerSchema, loginSchema} = require('./validation/authSchema');
const app = express();
const prisma = require('./prismaClient');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

app.get('/admin/stats',authMiddleware, adminMiddleware, async (req, res) => {
    try{
        const userCount = await prisma.user.count();
        const adminsCount = await prisma.user.count({
            where: {role: 'admin'},
        });

        const latestUsers = await prisma.user.findMany({
            orderBy: {id: 'desc'},
            take: 5,
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        res.json({
            userCount,
            adminsCount,
            latestUsers,
            serverStatus: 'All systems operational',
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Failed to load stats'});
    }
});

app.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post('/auth/login', async (req, res) => {

    const parsed = loginSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({message: 'Invalid input', errors: parsed.error.errors});
    }
    const {email, password} = parsed.data;
    
    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if (!user){
            return res.status(401).json({message: 'User not found'});
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.json({user, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.post('/auth/register', async (req, res) => {

    const parsed = registerSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({message: 'Invalid input', errors: parsed.error.errors});
    }


    const {email, password} = parsed.data;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });
        if (existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'user',
            },
        });
        const token = jwt.sign(
            {
                id: user.id, role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.get('/auth/me', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.user.id},
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});



//admin functions
app.get('/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true, 
                email: true,
                role: true,
            },
            orderBy: {id: 'desc'},
        });
        res.json(users);
    } catch(e) {
        console.error(e);
        res.status(500).json({message: 'Failed to load users'});
    }
});

app.delete('/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.user.delete({
            where: {id},
        });
        res.json({success: true});
    } catch(e) {
        console.error(e);
        res.status(500).json({message: 'Failed to delete user'});
    }
});

app.patch('/admin/users/:id/role', authMiddleware, adminMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const {role} = req.body;

    try {
        const user = await prisma.user.update({
            where: {id},
            data: {role},
            select: {id: true, email: true, role: true},
        });
        res.json(user);
    } catch(e) {
        console.error(e);
        res.status(500).json({message: 'Failed to update user role'});
    }
});

