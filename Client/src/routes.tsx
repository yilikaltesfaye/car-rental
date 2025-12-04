import { createBrowserRouter } from "react-router";
import App from "./App.tsx";

// Public
import Home from "./pages/public/Home.tsx";
import Login from "./pages/public/Login.tsx";
import Register from "./pages/public/Register.tsx";
import LogoutPage from "./pages/public/Logout.tsx";

// User
import UserLayout from "./pages/user/UserLayout.tsx";
import UserHome from "./pages/user/UserHome.tsx";
import CarDetail from "./pages/user/CarDetail.tsx";
import RentPage from "./pages/user/RentPage.tsx";
import UserProfile from "./pages/user/UserProfile.tsx";
import UserOrders from "./pages/user/UserOrders.tsx";

// Admin
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminCars from "./pages/admin/AdminCars.tsx";
import AdminRentals from "./pages/admin/AdminRentals.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";

// Auth protection
import { RequireAuth, RequireRole } from "./auth/RequireRole.tsx";
import AdminProfile from "./pages/admin/AdminProfile.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			// Public routes
			{ index: true, element: <Home /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
		],
	},
	{ path: "/logout", element: <LogoutPage /> },

	// User environment (protected)
	{
		path: "/user",
		element: (
			<RequireAuth>
				<RequireRole role="user">
					<UserLayout />
				</RequireRole>
			</RequireAuth>
		),
		children: [
			{ index: true, element: <UserHome /> },
			{ path: "car/:carId", element: <CarDetail /> },
			{ path: "rent/:carId", element: <RentPage /> },
			{ path: "profile", element: <UserProfile /> },
			{ path: "orders", element: <UserOrders /> },
		],
	},

	// Admin environment (protected)
	{
		path: "/admin",
		element: (
			<RequireAuth>
				<RequireRole role="admin">
					<AdminLayout />
				</RequireRole>
			</RequireAuth>
		),
		children: [
			{ index: true, element: <AdminDashboard /> },
			{ path: "cars", element: <AdminCars /> },
			{ path: "rentals", element: <AdminRentals /> },
			{ path: "users", element: <AdminUsers /> },
			{ path: "categories", element: <AdminCategories /> },
			{ path: "profile", element: <AdminProfile /> },
		],
	},

	// 404 fallback
	{ path: "*", element: <div>404 - Not Found</div> },
]);

export default router;
