import type { User } from './types/user'; 

function App() {

  const user: User | null = {
    id: 1,
    email: "example@example.com",
    role: "admin"
  } // Example user variable
  
  return (
    <div>
      <h1>Portfolio App</h1>
      <p>Status: {user ? user.email : 'guest'}</p>
    </div>
  );
}

export default App
