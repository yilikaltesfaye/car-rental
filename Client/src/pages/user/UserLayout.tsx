import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import User3FillIcon from "remixicon-react/User3FillIcon";
import HomeLineIcon from "remixicon-react/HomeLineIcon";
import FileListLineIcon from "remixicon-react/FileListLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import MenuLineIcon from "remixicon-react/MenuLineIcon";

const UserLayout = () => {
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	const navItems = [
		{ name: "Home", link: "/user", icon: HomeLineIcon },
		{ name: "Orders", link: "/user/orders", icon: FileListLineIcon },
	];

	return (
		<div className="flex flex-col h-screen w-full font-inter bg-gray-50">
			<nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-md rounded-xl m-3 md:m-5">
				<Link to="/user">
					<h1 className="italic font-bold font-serif text-2xl md:text-3xl text-gray-950">
						Carent.
					</h1>
				</Link>

				<ul className="hidden md:flex flex-row gap-6 lg:gap-10 text-lg font-medium">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link
								to={item.link}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
									location.pathname === item.link
										? "bg-gray-200 font-semibold"
										: "hover:bg-gray-100"
								}`}
							>
								<item.icon size={20} />
								{item.name}
							</Link>
						</li>
					))}
				</ul>

				<div className="hidden md:flex items-center gap-4">
					<div className="relative">
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
						>
							<User3FillIcon size={20} />
							Menu
						</button>

						{menuOpen && (
							<div className="absolute right-0 mt-2 w-44 bg-white shadow-xl border rounded-xl py-2 z-50 flex flex-col">
								<Link
									to="/user/profile"
									className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									<User3FillIcon size={18} />
									Profile
								</Link>
								<Link
									to="/logout"
									className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									<CloseLineIcon size={18} />
									Logout
								</Link>
							</div>
						)}
					</div>
				</div>

				<div className="md:hidden">
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center gap-2"
					>
						<MenuLineIcon size={20} />
						Menu
					</button>
					{menuOpen && (
						<div className="absolute right-3 mt-2 w-44 bg-white shadow-xl border rounded-xl py-2 z-50 flex flex-col">
							{navItems.map((item) => (
								<Link
									key={item.name}
									to={item.link}
									className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									<item.icon size={18} />
									{item.name}
								</Link>
							))}
							<div className="border-t border-gray-200 my-1" />
							<Link
								to="/user/profile"
								className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
								onClick={() => setMenuOpen(false)}
							>
								<User3FillIcon size={18} />
								Profile
							</Link>
							<Link
								to="/logout"
								className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
								onClick={() => setMenuOpen(false)}
							>
								<CloseLineIcon size={18} />
								Logout
							</Link>
						</div>
					)}
				</div>
			</nav>

			<main className="flex-1 flex flex-col w-full  p-6 bg-gray-50">
				<div className="flex-1 overflow-y-scroll">
					<Outlet />
				</div>

				<footer className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
					&copy; {new Date().getFullYear()} Carent. All rights reserved.
				</footer>
			</main>
		</div>
	);
};

export default UserLayout;
