import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../../../styles/auth.css";

const RegisterPage = () => {

    const { mutate, isPending } = useRegister();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError("");
        setSuccess("");

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();
        setError("");
        setSuccess("");

        mutate(formData, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token)
                setSuccess("Registration successful! Redirecting...");
                setFormData({
                    username: "",
                    email: "",
                    password: ""
                });
            },
            onError: (error) => {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
                    setError(errorMessage);
                    console.log(errorMessage);
                }
            }
        });

    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-header">
                        <h1>Create Account</h1>
                        <p>Join us to manage your tasks efficiently</p>
                    </div>

                    {error && (
                        <div className="auth-error show">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success show">
                            {success}
                        </div>
                    )}

                    <div className="auth-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                            placeholder="Create a strong password"
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
                        {isPending ? "Creating Account..." : "Register"}
                    </button>

                    <div className="auth-link-group">
                        <span className="auth-link-text">Already have an account?</span>
                        <Link className="auth-link" to="/login">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default RegisterPage;