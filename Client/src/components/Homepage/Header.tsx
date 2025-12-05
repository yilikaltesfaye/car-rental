import { Link, NavLink } from "react-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Slider from "react-slick";

const brands = [
	"bmw",
	"Chevrolet",
	"ferrari",
	"honda",
	"Mercedes",
	"toyota",
	"Volkswagen",
];

const Header = () => {
	const sliderSettings = {
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 5000,
		cssEase: "linear",
		swipeToSlide: true,
		arrows: false,
		pauseOnHover: true,
		responsive: [
			{ breakpoint: 1024, settings: { slidesToShow: 4 } },
			{ breakpoint: 768, settings: { slidesToShow: 3 } },
			{ breakpoint: 480, settings: { slidesToShow: 2 } },
		],
	};
	return (
		<div className="max-h-screen overflow-hidden">
			<div className="bg-[url(/images/bg-hero.jpg)] bg-cover bg-center md:bg-bottom m-3 md:m-5 rounded-xl md:rounded-2xl h-[60vh] sm:h-[65vh] md:h-[75vh] text-white flex flex-col justify-between">
				<nav className="flex flex-row justify-between items-center px-6 md:px-10 py-4 font-inter">
					<h1 className="italic font-bold text-2xl md:text-3xl">Carent.</h1>

					<ul className="hidden md:flex flex-row gap-10 lg:gap-20 text-base lg:text-lg font-medium">
						<li>
							<a
								href="#"
								className="hover:text-gray-200 transition-colors cursor-pointer"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="hover:text-gray-200 transition-colors cursor-pointer"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="#howitworks"
								className="hover:text-gray-200 transition-colors cursor-pointer"
							>
								How it works
							</a>
						</li>
					</ul>

					<div className="hidden md:flex flex-row items-center gap-4">
						<NavLink to="/register">
							<button
								className="
        px-7 py-2.5 rounded-xl
        bg-white text-gray-950
        font-inter text-lg font-bold
        border border-white
        transition-colors duration-300
        hover:bg-gray-950 hover:border-gray-950 hover:text-white cursor-pointer
      "
							>
								SignUp
							</button>
						</NavLink>

						<NavLink to="/login">
							<button
								className="px-7 py-2.5 rounded-xl
        bg-white text-gray-950
        font-inter text-lg font-bold
        border border-white
        transition-colors duration-300
        hover:bg-gray-950 hover:border-gray-950 hover:text-white cursor-pointer
     "
							>
								LogIn
							</button>
						</NavLink>
					</div>

					<div className="md:hidden">
						<Menu>
							<MenuButton
								className=" px-7 py-2.5 rounded-xl
        bg-white text-slate-800
        font-inter text-lg font-bold
        border border-white
        transition-colors duration-300
        hover:bg-slate-800 hover:border-slate-800 hover:text-white cursor-pointer"
							>
								Menu
							</MenuButton>

							<MenuItems className="absolute right-6 mt-3 w-44 sm:w-48 rounded-xl bg-white text-black shadow-xl flex flex-col font-inter text-sm outline-none">
								<MenuItem>
									<a
										href=""
										className="px-4 py-3 data-focus:bg-gray-100 cursor-pointer"
									>
										Home
									</a>
								</MenuItem>

								<MenuItem>
									<a
										href="#services"
										className="px-4 py-3 data-focus:bg-gray-100 cursor-pointer"
									>
										Services
									</a>
								</MenuItem>

								<MenuItem>
									<a
										href="#howitworks"
										className="px-4 py-3 data-focus:bg-gray-100 cursor-pointer"
									>
										How it works
									</a>
								</MenuItem>

								<div className="border-t border-gray-200 mt-1" />

								<MenuItem>
									<Link
										to="/register"
										className="px-4 py-3 data-focus:bg-gray-100 cursor-pointer"
									>
										SignUp
									</Link>
								</MenuItem>

								<MenuItem>
									<Link
										to="/login"
										className="px-4 rounded-xl py-3 cursor-pointer data-focus:bg-gray-100"
									>
										LogIn
									</Link>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</nav>

				<div className="flex flex-col items-center justify-end translate-y-1 sm:translate-y-1 md:translate-y-3 pointer-events-none">
					<h2
						className="font-bold font-inter leading-none
            text-[8rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem]"
					>
						Car Rental
					</h2>
				</div>
			</div>

			<div className="w-full py-8 sm:py-10">
				<Slider {...sliderSettings}>
					{brands.map((brand) => (
						<div key={brand} className="px-4">
							<img
								src={`/images/cars/${brand}.png`}
								alt={brand}
								className="h-28 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 cursor-pointer transition duration-700 mx-auto"
							/>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default Header;
