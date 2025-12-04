import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function LogoutPage() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		logout().finally(() => {
			navigate("/", { replace: true });
		});
	}, [logout, navigate]);

	return null;
}
