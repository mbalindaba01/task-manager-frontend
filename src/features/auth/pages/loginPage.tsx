import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault()

        mutate(formData, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token)
                navigate('/tasks')
                setFormData({
                    email: "",
                    password: ""
                });
            },
            onError: (error) => {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data.message);
                }
            }
        })
    }

     return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <button
                type="submit"
                disabled={isPending}
            >
                Login
            </button>
            <p>Don't have an account?{" "}</p>
            <Link
            to="/register"
            >
            Register here
            </Link>

        </form>
    );
}

export default LoginPage