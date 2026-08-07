import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import axios from 'axios';
import { Link } from "react-router-dom";

const RegisterPage = () => {

    const { mutate, isPending } = useRegister();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        mutate(formData, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token)
                setFormData({
                    username: "",
                    email: "",
                    password: ""
                });
            },
            onError: (error) => {
                if (axios.isAxiosError(error)) {
                console.log(error.response?.data.message);
    }
            }
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />

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
                Register
            </button>
            <p>Already have an account?{" "}</p>
            <Link
            to="/login"
            >
            Login here
            </Link>

        </form>
    );

};

export default RegisterPage;