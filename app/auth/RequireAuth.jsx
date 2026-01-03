"use client";

import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RequireAuth = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
                router.replace("/login");
            }
        }
    }, [user, loading, allowedRoles, router]);

    if (loading || !user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return <div>Loading...</div>;
    }

    return children;
};

export default RequireAuth;




