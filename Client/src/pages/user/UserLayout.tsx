import { Outlet, Link } from "react-router";
import { useState } from "react";
import User3FillIcon from "remixicon-react/User3FillIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import RequireAuth from "../../auth/RequireAuth";
import RequireRole from "../../auth/RequireRole";
import { Role } from "../../types";

const UserLayout = () => {
	const [open, setOpen] = useState(false);
	const navItems = [
		{
			name: "Home",
			link: "/user",
		},
		{
			name: "Profile",
			link: "/user/profile",
		},
		{
			name: "Orders",
			link: "/user/orders",
		},
	];

	return (
		<RequireAuth>
			<RequireRole role={Role.USER}>
				<div className="flex flex-col h-screen w-full">
					<nav className="flex flex-row justify-between px-8 py-2 items-center cursor-pointer border-b">
						<Link to="/user/home">
							<h1 className="italic font-bold font-serif text-2xl">Carent.</h1>
						</Link>

						<ul className="flex flex-row gap-24 text-2xl font-medium">
							{navItems.map((item) => {
								return (
									<li>
										<Link to={item.link}>{item.name}</Link>
									</li>
								);
							})}
						</ul>

						<div className="relative">
							<button
								onClick={() => setOpen(!open)}
								className="w-12 h-12 rounded-full flex items-center justify-center text-3xl cursor-pointer"
							>
								{open ? (
									<CloseLineIcon size={28} />
								) : (
									<User3FillIcon size={28} />
								)}
							</button>

							{open && (
								<div className="absolute right-0 mt-2 w-44 bg-white shadow-md border rounded-md py-2 text-lg">
									<Link
										to="/logout"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Logout
									</Link>
								</div>
							)}
						</div>
					</nav>

					<div className="flex-1 overflow-auto">
						<Outlet />
					</div>
				</div>
			</RequireRole>
		</RequireAuth>
	);
};

export default UserLayout;
