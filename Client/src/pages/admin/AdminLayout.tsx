import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import type { NavLinkRenderProps } from "react-router";

import CarLineIcon from "remixicon-react/CarLineIcon";
import FileList2LineIcon from "remixicon-react/FileList2LineIcon";
import TeamLineIcon from "remixicon-react/TeamLineIcon";
import GridLineIcon from "remixicon-react/GridLineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import LogoutCircleLineIcon from "remixicon-react/LogoutCircleLineIcon";
import HomeLineIcon from "remixicon-react/HomeLineIcon";
import Settings2LineIcon from "remixicon-react/Settings2LineIcon";
import type { RemixiconReactIconComponentType } from "remixicon-react";

import { useAuth } from "../../context/AuthContext";

interface NavItem {
	label: string;
	path: string;
	icon: RemixiconReactIconComponentType;
	end?: boolean;
	danger?: boolean;
}

// Static title for each route. Dashboard is handled separately since it
// needs the logged-in user's name.
const PAGE_TITLES: Record<string, string> = {
	"/admin/cars": "Cars Management",
	"/admin/categories": "Categories Management",
	"/admin/rentals": "Rentals Management",
	"/admin/users": "Users Management",
	"/admin/profile": "My Profile",
};

export default function AdminLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const { user } = useAuth();
	const location = useLocation();

	const menuItems: NavItem[] = [
		{ label: "Dashboard", path: "/admin", icon: HomeLineIcon, end: true },
		{ label: "Cars", path: "/admin/cars", icon: CarLineIcon },
		{ label: "Rentals", path: "/admin/rentals", icon: FileList2LineIcon },
		{ label: "Users", path: "/admin/users", icon: TeamLineIcon },
		{ label: "Categories", path: "/admin/categories", icon: GridLineIcon },
	];

	const footerItems: NavItem[] = [
		{ label: "Profile", path: "/admin/profile", icon: UserLineIcon },
		{
			label: "Logout",
			path: "/logout",
			icon: LogoutCircleLineIcon,
			danger: true,
		},
	];

	const navLinkClass = (
		{ isActive }: NavLinkRenderProps,
		danger = false,
	): string =>
		[
			"flex items-center gap-3",
			"is-drawer-close:justify-center",
			danger
				? "text-error hover:bg-error hover:text-error-content"
				: isActive
					? "menu-active"
					: "",
		]
			.filter(Boolean)
			.join(" ");

	const isDashboard = location.pathname === "/admin";

	return (
		<div className="drawer lg:drawer-open">
			<input
				id="my-drawer-4"
				type="checkbox"
				className="drawer-toggle inline"
			/>
			<div className="drawer-content">
				{/* Navbar */}
				<nav className="navbar w-full bg-base-300">
					<label
						htmlFor="my-drawer-4"
						aria-label="open sidebar"
						className="btn btn-square btn-ghost drawer-button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2"
							fill="none"
							stroke="currentColor"
							className="my-1.5 inline-block size-6"
						>
							<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
							<path d="M9 4v16"></path>
							<path d="M14 10l2 2l-2 2"></path>
						</svg>
					</label>

					{isDashboard ? (
						<div className="px-4 flex items-center gap-2 sm:gap-4">
							<h2 className="text-base sm:text-2xl font-semibold ">
								Welcome back, {user?.username.toUpperCase()}
							</h2>
							<p className="text-gray-500 text-[10px] sm:text-sm self-end">
								Full Name: {user?.full_name}
							</p>
						</div>
					) : (
						<h2 className="px-4 font-semibold text-lg sm:text-2xl">
							{PAGE_TITLES[location.pathname] ?? "Dashboard"}
						</h2>
					)}
				</nav>

				{/* Page content */}
				<div className="p-4">
					<Outlet />
				</div>
			</div>

			<div className="drawer-side is-drawer-close:overflow-visible">
				<label
					htmlFor="my-drawer-4"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
					{/* Brand */}
					<div className="flex w-full items-center gap-2 px-4 py-4">
						<CarLineIcon size={24} className="shrink-0 text-primary" />
						<span className="text-xl font-bold is-drawer-close:hidden">
							Carent.
						</span>
					</div>

					{/* Main nav */}
					<ul className="menu w-full grow">
						{menuItems.map((item) => {
							const Icon = item.icon;
							return (
								<li
									key={item.path}
									className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
									data-tip={item.label}
								>
									<NavLink
										to={item.path}
										end={item.end}
										className={(state) => navLinkClass(state)}
										title={collapsed ? item.label : undefined}
									>
										<Icon size={24} />
										<span className="text-left is-drawer-close:hidden">
											{item.label}
										</span>
									</NavLink>
								</li>
							);
						})}
					</ul>

					{/* Footer nav (profile / logout) */}
					<ul className="menu w-full">
						{footerItems.map((item) => {
							const Icon = item.icon;
							return (
								<li
									key={item.path}
									className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
									data-tip={item.label}
								>
									<NavLink
										to={item.path}
										className={(state) => navLinkClass(state, item.danger)}
										title={collapsed ? item.label : undefined}
									>
										<Icon size={24} />
										<span className="text-left is-drawer-close:hidden">
											{item.label}
										</span>
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
