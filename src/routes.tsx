// src/router.tsx
import { createBrowserRouter } from "react-router";
import App from "./App";

// Public
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// User
import UserLayout from "./pages/user/UserLayout";
import UserHome from "./pages/user/UserHome";
import CarDetail from "./pages/user/CarDetail";
import RentPage from "./pages/user/RentPage";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";

// // Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminCars from "./pages/admin/AdminCars";
import AdminRentals from "./pages/admin/AdminRentals";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";

// // Auth
// import RequireAuth from "./auth/RequireAuth";
// import RequireRole from "./auth/RequireRole";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			// Public
			{ index: true, element: <Home /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },

			// User environment
			{
				path: "user",
				element: (
					//   <RequireAuth>
					//     <RequireRole role="user">
					<UserLayout />
					//     {/* </RequireRole>
					//   </RequireAuth> */}
				),
				children: [
					{ index: true, element: <UserHome /> }, // categories + gallery
					{ path: "car/:carId", element: <CarDetail /> }, // detail page
					{ path: "rent/:carId", element: <RentPage /> }, // rent flow
					{ path: "profile", element: <UserProfile /> }, // profile page
					{ path: "orders", element: <UserOrders /> }, // rental history
				],
			},

			// Admin environment
			{
				path: "admin",
				element: (
					//   <RequireAuth>
					// <RequireRole role="admin">
					<AdminLayout />
					// </RequireRole>
					//   </RequireAuth>
				),
				children: [
					{ index: true, element: <AdminDashboard /> },
					{ path: "cars", element: <AdminCars /> },
					{ path: "rentals", element: <AdminRentals /> },
					{ path: "users", element: <AdminUsers /> },
					{ path: "categories", element: <AdminCategories /> },
				],
			},

			// 404
			{ path: "*", element: <div>404 - Not Found</div> },
		],
	},
]);

export default router;
