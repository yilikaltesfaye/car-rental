// src/router.tsx
import { createBrowserRouter } from "react-router";
import App from "./App.tsx";

// Public
import Home from "./pages/public/Home.tsx";
import Login from "./pages/public/Login.tsx";
import Register from "./pages/public/Register.tsx";

// User
import UserLayout from "./pages/user/UserLayout.tsx";
import UserHome from "./pages/user/UserHome.tsx";
import CarDetail from "./pages/user/CarDetail.tsx";
import RentPage from "./pages/user/RentPage.tsx";
import UserProfile from "./pages/user/UserProfile.tsx";
import UserOrders from "./pages/user/UserOrders.tsx";

// // Admin
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminCars from "./pages/admin/AdminCars.tsx";
import AdminRentals from "./pages/admin/AdminRentals.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";

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
