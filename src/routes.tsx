import { createBrowserRouter } from "react-router";
import App from "./App";

// public
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// // user
// import UserLayout from "./pages/user/UserLayout";
// import UserHome from "./pages/user/UserHome";
// import CategoryPage from "./pages/user/CategoryPage";
// import CarDetail from "./pages/user/CarDetail";
// import RentFlow from "./pages/user/RentFlow";

// // admin
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminCars from "./pages/admin/AdminCars";
// import AdminRentals from "./pages/admin/AdminRentals";

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

			// User workspace (role-protected)
			//   {
			//     path: "user",
			//     element: <RequireAuth><RequireRole role="user"><UserLayout /></RequireRole></RequireAuth>,
			//     children: [
			//       { index: true, element: <UserHome /> },
			//       { path: "category/:categoryId", element: <CategoryPage /> },
			//       { path: "car/:carId", element: <CarDetail /> },
			//       { path: "rent/:carId", element: <RentFlow /> },
			//     ],
			//   },

			// Admin workspace (role-protected)
			//   {
			//     path: "admin",
			//     element: <RequireAuth><RequireRole role="admin"><AdminLayout /></RequireRole></RequireAuth>,
			//     children: [
			//       { index: true, element: <AdminDashboard /> },
			//       { path: "cars", element: <AdminCars /> },
			//       { path: "rentals", element: <AdminRentals /> },
			//     ],
			//   },
		],
	},
]);

export default router;
