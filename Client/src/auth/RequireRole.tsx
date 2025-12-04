import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

// Require logged-in user
export const RequireAuth: React.FC<{ children: JSX.Element }> = ({
	children,
}) => {
	const { user, isLoading } = useAuth();

	if (isLoading) return <div>Loading...</div>; // show loader instead of null

	if (!user) return <Navigate to="/login" replace />;

	return children;
};

// Require user with specific role
interface RequireRoleProps {
	role: "user" | "admin"; // keep consistent with Role type
	children: JSX.Element;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ role, children }) => {
	const { user, isLoading } = useAuth();

	if (isLoading) return <div>Loading...</div>; // show loader instead of null

	if (!user || user.role?.toLowerCase() !== role.toLowerCase()) {
		console.log("Redirecting due to role mismatch", user?.role, role);
		return <Navigate to="/login" replace />;
	}

	return children;
};
