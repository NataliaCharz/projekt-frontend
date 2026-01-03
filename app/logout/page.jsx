"use client";

import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export default function LogoutPage() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);

    return <div>Logging out...</div>;
}

