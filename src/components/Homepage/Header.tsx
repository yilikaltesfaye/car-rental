import { Link } from "react-router";

const Header = () => {
	return (
		<div className="h-screen overflow-hidden">
			<div className="bg-amber-900 m-5 rounded-2xl h-[75vh] text-white flex flex-col overflow-hidden justify-between">
				<nav className="flex flex-row justify-between pl-16 py-2 items-center cursor-pointer">
					<h1 className="italic font-bold font-serif text-lg">Carent.</h1>
					<ul className="flex flex-row gap-8">
						<li>
							<a href="">Home</a>
						</li>
						<li>
							<a href="#services">Services</a>
						</li>
						<li>
							<a href="#howitworks">How it works</a>
						</li>
					</ul>
					<Link to={"/register"}>
						<button className="bg-[#04223f] py-2 px-5 rounded-2xl">
							Get Started
						</button>
					</Link>
				</nav>
				<div className="flex flex-col items-center justify-end cursor-default translate-y-16 hover:my-5 hover:translate-y-0 duration-300 ease-out transition-all gap-6">
					<h2 className="text-9xl p-0 font-sans font-bold">Car Rental</h2>
					<div className=" flex flex-row gap-8">
						<Link to={"/register"}>
							<button className="cursor-pointer bg-blue-950 px-4 py-2 rounded-2xl">
								SignUp
							</button>
						</Link>
						<Link to={"/login"}>
							<button className="cursor-pointer bg-blue-950 px-4 py-2 rounded-2xl">
								LogIn
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="">
				<ul className="flex h-full flex-row items-center justify-center gap-16 text-5xl">
					<li>sdsd</li>
					<li>sdsd</li>
					<li>sdsd</li>
					<li>sdsd</li>
					<li>sdsd</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
