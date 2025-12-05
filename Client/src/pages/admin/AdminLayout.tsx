import { useState } from "react";
import { Outlet, NavLink } from "react-router";

// Remix Icons
import DashboardLineIcon from "remixicon-react/LayoutGridLineIcon";
import CarLineIcon from "remixicon-react/CarLineIcon";
import FileList2LineIcon from "remixicon-react/FileList2LineIcon";
import TeamLineIcon from "remixicon-react/TeamLineIcon";
import GridLineIcon from "remixicon-react/GridLineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import LogoutCircleLineIcon from "remixicon-react/LogoutCircleLineIcon";
import MenuLineIcon from "remixicon-react/MenuLineIcon";

export default function AdminLayout() {
	const [collapsed, setCollapsed] = useState(false);

	const menuItems = [
		{ label: "Dashboard", path: "/admin", icon: DashboardLineIcon },
		{ label: "Cars", path: "/admin/cars", icon: CarLineIcon },
		{ label: "Rentals", path: "/admin/rentals", icon: FileList2LineIcon },
		{ label: "Users", path: "/admin/users", icon: TeamLineIcon },
		{ label: "Categories", path: "/admin/categories", icon: GridLineIcon },
	];

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<aside
				className={`bg-white border-r border-gray-300 flex flex-col transition-all duration-300 ${
					collapsed ? "w-20" : "w-72 shadow-md"
				}`}
			>
				{/* Top: toggle button */}
				<div
					className={`flex items-center p-4 border-b border-gray-200 ${
						collapsed ? "justify-center" : "justify-between "
					} `}
				>
					{!collapsed && (
						<h1 className="italic font-bold font-serif text-2xl text-gray-950">
							Carent.
						</h1>
					)}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-1 hover:bg-gray-200 rounded transition text-center"
					>
						<MenuLineIcon size={24} />
					</button>
				</div>

				{/* Primary Navigation */}
				<nav className="flex flex-col grow mt-5 px-2 gap-1">
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<NavLink
								key={item.path}
								to={item.path}
								end={item.path === "/admin"}
								className={({ isActive }) =>
									`flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-medium text-gray-700 hover:bg-gray-950 hover:text-white ${
										isActive ? "bg-gray-950 text-white" : ""
									} ${collapsed ? "justify-center py-3 px-0" : ""}`
								}
								title={collapsed ? item.label : undefined}
							>
								<Icon size={20} />
								{!collapsed && <span className="text-left">{item.label}</span>}
							</NavLink>
						);
					})}
				</nav>

				{/* Secondary Navigation */}
				<div className="mt-auto p-2 flex flex-col gap-1 px-2">
					<NavLink
						to="/admin/profile"
						className={({ isActive }) =>
							`flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-medium text-gray-700 hover:bg-gray-950 hover:text-white ${
								isActive ? "bg-gray-950 text-white" : ""
							} ${collapsed ? "justify-center py-3 px-0" : ""}`
						}
						title={collapsed ? "Profile" : undefined}
					>
						<UserLineIcon size={20} />
						{!collapsed && <span className="text-left">Profile</span>}
					</NavLink>

					<NavLink
						to="/logout"
						className={`flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 font-medium hover:bg-red-100 hover:text-red-700 ${
							collapsed ? "justify-center py-3 px-0" : ""
						}`}
						title={collapsed ? "Logout" : undefined}
					>
						<LogoutCircleLineIcon size={20} />
						{!collapsed && <span className="text-left">Logout</span>}
					</NavLink>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-auto p-6 bg-gray-50">
				<Outlet />
			</main>
		</div>
	);
}
