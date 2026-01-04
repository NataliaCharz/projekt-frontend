"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import {useRouter} from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch (err) {
            console.log("Invalid token or no user", err);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const res = await api.post("/auth/login", credentials);
            const userData = { username: res.data.username, role: res.data.role };

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            setUser(userData);

            if (res.data.role === "ADMIN") {
                router.push("/admin/home");
            } else if (res.data.role === "USER"){
                router.push("/user/home");
            } else {
                router.push("/");
            }
        } catch (err) {
            console.error("Login failed", err);
            throw err;
        }
    };


    const register = async (credentials) => {
        try {
            const res = await api.post("/auth/register", credentials);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            setUser({ username: res.data.username, role: res.data.role });

            if (res.data.role === "ADMIN") {
                router.push("/admin/home");
            } else {
                router.push("/user/home");
            }
        } catch (err) {
            console.error("Register failed", err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

