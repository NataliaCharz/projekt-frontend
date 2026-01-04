'use client';

import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RequireAuth = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
                router.replace("/login");
            } else {
                setAuthorized(true);
            }
        }
    }, [user, loading, allowedRoles, router]);

    if (!authorized) {
        return <div>Loading...</div>;
    }

    return children;
};

export default RequireAuth;





