import { Outlet, NavLink } from "react-router";

export default function AdminLayout() {
	const menuItems = [
		{ name: "Dashboard", path: "/admin" },
		{ name: "Cars", path: "/admin/cars" },
		{ name: "Rentals", path: "/admin/rentals" },
		{ name: "Users", path: "/admin/users" },
		{ name: "Categories", path: "/admin/categories" },
	];

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className="w-64 bg-white border-r border-gray-300 p-6 flex flex-col gap-6">
				<h1 className="text-xl font-bold">Admin Panel</h1>
				<nav className="flex flex-col gap-3">
					{menuItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								`p-2 rounded hover:bg-gray-200 ${
									isActive ? "bg-gray-200 font-semibold" : ""
								}`
							}
						>
							{item.name}
						</NavLink>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-auto p-6">
				<Outlet />
			</main>
		</div>
	);
}
