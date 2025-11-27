import { Link } from "react-router";

const Header = () => {
	return (
		<div className="h-screen overflow-hidden">
			<div className="bg-[url(/public/images/bg-hero.jpg)] bg-cover bg-bottom m-5 rounded-2xl h-[75vh] text-white flex flex-col overflow-hidden justify-between">
				<nav className="flex flex-row justify-between px-8 py-2 items-center cursor-pointer">
					<h1 className="italic font-bold font-serif text-2xl">Carent.</h1>
					<ul className="flex flex-row gap-24 text-2xl font-medium">
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
						<button className="bg-[#04223f] py-2 px-5 rounded-xl">
							Get Started
						</button>
					</Link>
				</nav>
				<div className="flex flex-col items-center justify-end cursor-default translate-y-16 hover:my-5 hover:translate-y-0 duration-300 ease-out transition-all gap-6">
					<h2 className="text-9xl p-0 font-sans font-bold tracking-widest">
						Car Rental
					</h2>
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
			<div className="w-full inline-flex flex-nowrap px-16">
				<ul className="flex items-center justify-center md:justify-center [&_li]:mx-8 [&_img]:grayscale ">
					<li>
						<img src="/public/images/cars/bmw.png" alt="BMW" />
					</li>
					<li>
						<img src="/public/images/cars/Chevrolet.png" alt="Chevrolet" />
					</li>
					<li>
						<img src="/public/images/cars/ferrari.png" alt="Ferrari" />
					</li>
					<li>
						<img src="/public/images/cars/honda.png" alt="Honda" />
					</li>
					<li>
						<img src="/public/images/cars/Mercedes.png" alt="Mercedes" />
					</li>
					<li>
						<img src="/public/images/cars/toyota.png" alt="Toyota" />
					</li>
					<li>
						<img src="/public/images/cars/Volkswagen.png" alt="Volkswagen" />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
