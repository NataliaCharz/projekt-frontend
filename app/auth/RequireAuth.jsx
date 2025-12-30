"use client";

import { useAuth } from "./authContext";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const RequireAuth = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!roles.includes(user.role)) {
        navigate("/login");
      }
    }
  }, [user, loading, roles, navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default RequireAuth;


