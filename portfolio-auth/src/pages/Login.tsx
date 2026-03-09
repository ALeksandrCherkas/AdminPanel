import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { LoginFormData } from "../types/auth";
import Input from "../componetns/Input";
import { authApi } from "../api/authApi";
import { useAuth } from "../store/AuthContext";
import { handleApiError } from "../store/AuthContext";
import { showSuccess } from "../utils/toast";


function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      login(response.user, response.token);
      showSuccess("Logged in successfully!");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }

  const formData: LoginFormData = {
    email,
    password
  };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <Input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" 
            />
            
            <Input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" 
            />

            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
    );
}

export default Login;