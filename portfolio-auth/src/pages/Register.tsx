import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Input from "../componetns/Input";
import { authApi } from "../api/authApi";
import { handleApiError, useAuth } from "../store/AuthContext";
import { showSuccess } from "../utils/toast";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await authApi.register(email, password);

            login(response.user, response.token);
            showSuccess("Account created successfully!");
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <Input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <Input
            type="password"
            value = {password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Password"
            />

            <button
            type="submit"
            disabled={loading}>{loading ? "Creating account..." : "Register"}</button>
        </form>
    );
}

export default Register;
