import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";
import { Role } from "./types";

function App() {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (user) {
		if (user.role == Role.USER) {
			return <Navigate to="/user" />;
		}
		return <Navigate to="/admin" />;
	}
	return <Outlet />;
}

export default App;
