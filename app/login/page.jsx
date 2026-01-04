'use client';

import {useState} from "react";
import api from "../api/axios";
import {useRouter} from "next/navigation";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", {username, password});
            const user = res.data;
            localStorage.setItem("token", user.token);
            localStorage.setItem("role", user.role);
            console.log(res);
            redirectByRole(user.role);
        } catch (err) {
            alert("Error during logging in.");
        }
    };

    const handleGuest = async () => {
        try {
            router.push("/library")
        } catch (err) {
            alert("Error during logging as guest");
        }
    };

    const handleRegister = async () => {
        router.push("/register");
    }

    const redirectByRole = (role) => {
        if (role === "ADMIN") {
            router.push("/admin/home");
        } else if (role === "USER") {
            router.push("/user/home");
        } else {
            router.push("/");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onClick={() => setUsername("")}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onClick={() => setPassword("")}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
            <button onClick={handleGuest}>Use as Guest</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}