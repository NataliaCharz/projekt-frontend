'use client';

import {useState} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", {username, password});
            const user = res.data;
            console.log(res);
            redirectByRole(user.roles);
        } catch (err) {
            alert("Error during logging in.");
        }
    };

    const handleGuest = async () => {
        try {
            navigate("/library")
        } catch (err) {
            alert("Error during logging as guest");
        }
    };

    const handleRegister = async () => {
        navigate("/register");
    }

    const redirectByRole = (roles) => {
        if (roles.includes("ADMIN")) {
            navigate("/admin");
        } else if (roles.includes("USER")) {
            navigate("/user");
        } else {
            navigate("/");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
            <button onClick={handleGuest}>Use as Guest</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}






