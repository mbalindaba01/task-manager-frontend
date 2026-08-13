import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/auth.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin()
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError("");
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault()
        setError("");

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
                    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
                    setError(errorMessage);
                    console.log(errorMessage);
                }
            }
        })
    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Login to your task manager account</p>
                    </div>

                    {error && (
                        <div className="auth-error show">
                            {error}
                        </div>
                    )}

                    <div className="auth-form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="auth-submit-btn"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>

                    <div className="auth-link-group">
                        <span className="auth-link-text">Don't have an account?</span>
                        <Link className="auth-link" to="/register">
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage