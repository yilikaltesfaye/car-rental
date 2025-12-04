import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) return null; // or a loading spinner

	if (!user) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
};

export default RequireAuth;
