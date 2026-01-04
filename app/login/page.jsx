"use client";

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
        } catch {
            alert("Error during logging in.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Log in</button>
        </form>
    );
}