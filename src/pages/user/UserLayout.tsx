import { Outlet, Link } from "react-router";
import { useState } from "react";
import User3FillIcon from "remixicon-react/User3FillIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

const UserLayout = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col h-screen w-full">
			<nav className="flex flex-row justify-between px-8 py-2 items-center cursor-pointer border-b">
				<Link to="/user/home">
					<h1 className="italic font-bold font-serif text-2xl">Carent.</h1>
				</Link>

				<ul className="flex flex-row gap-24 text-2xl font-medium">
					<li>
						<Link to="/user">Home</Link>
					</li>
					<li>
						<Link to="/user/collections">Collections</Link>
					</li>
					<li>
						<Link to="/user/orders">Orders</Link>
					</li>
				</ul>

				<div className="relative">
					<button
						onClick={() => setOpen(!open)}
						className="w-12 h-12 rounded-full flex items-center justify-center text-3xl cursor-pointer"
					>
						{open ? <CloseLineIcon size={28} /> : <User3FillIcon size={28} />}
					</button>

					{open && (
						<div className="absolute right-0 mt-2 w-44 bg-white shadow-md border rounded-md py-2 text-lg">
							<Link
								to="/user/profile"
								className="block px-4 py-2 hover:bg-gray-100"
							>
								Profile
							</Link>

							<Link
								to="/user/settings"
								className="block px-4 py-2 hover:bg-gray-100"
							>
								Settings
							</Link>

							<Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">
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
	);
};

export default UserLayout;
