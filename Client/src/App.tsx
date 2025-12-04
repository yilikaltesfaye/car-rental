import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";

function App() {
	const { user } = useAuth();
	if (user?.role === "user") return <Navigate to="/user" />;
	if (user?.role === "admin") return <Navigate to="/admin" />;

	return <Outlet />;
}

export default App;
