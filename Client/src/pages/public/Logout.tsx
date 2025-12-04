import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function LogoutPage() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const run = async () => {
			try {
				await logout();
			} catch (err) {
				console.error("Logout failed", err);
			} finally {
				navigate("/", { replace: true });
			}
		};

		run();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex justify-center items-center h-screen">
			Logging out...
		</div>
	);
}
