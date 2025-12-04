import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";
import type { Role } from "../types"; // import Role type

interface RequireRoleProps {
	role: Role; // <- use Role type here
	children: JSX.Element;
}

const RequireRole: React.FC<RequireRoleProps> = ({ role, children }) => {
	const { user } = useAuth();

	if (!user || user.role !== role) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default RequireRole;
