'use client';

import {useAuth} from "./AuthContext";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const RequireAuth = ({children, allowedRoles}) => {
    const {user, loading} = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
                router.replace("/login");
            } else {
                setAuthorized(true);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        }
    }, [user, loading, allowedRoles, router]);

    if (!authorized) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        )
    }

    return children;
};

export default RequireAuth;





