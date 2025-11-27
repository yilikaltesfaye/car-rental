import { Outlet } from "react-router";

const UserLayout = () => {
	return (
		<div className="flex flex-col">
			<nav className="flex flex-row justify-between pl-16 py-2 items-center cursor-pointer">
				<h1 className="italic font-bold font-serif text-lg">Carent.</h1>
				<ul className="flex flex-row gap-8">
					<li>
						<a href="">Home</a>
					</li>
					<li>
						<a href="#collections">Collection</a>
					</li>
					<li>
						<a href="#orders">Orders</a>
					</li>
				</ul>
				<button className="bg-black p-5 rounded-full"></button>
			</nav>
			<Outlet />
		</div>
	);
};

export default UserLayout;
