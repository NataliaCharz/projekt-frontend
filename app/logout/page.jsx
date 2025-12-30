"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "../api/axios";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        api.post("/auth/logout")
            .finally(() => router.push("/login"));
    }, []);

    return <div>Logged out...</div>;
}
