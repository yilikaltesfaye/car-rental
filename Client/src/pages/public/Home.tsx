import Header from "../../components/Homepage/Header";
import Services from "../../components/Homepage/Services";
import Works from "../../components/Homepage/Works";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
	return (
		<div>
			<Header />
			<Services />
			<Works />
			<Footer />
		</div>
	);
};

export default Home;

const Footer = () => {
	return (
		<footer className="bg-gray-950 text-gray-200 mt-10">
			<div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
				{/* Branding */}
				<div className="flex flex-col gap-3">
					<h1 className="text-white font-bold text-2xl font-inter italic">
						Carent.
					</h1>
					<p className="text-gray-400 text-sm max-w-xs">
						Premium car rental service. Rent your perfect car easily and
						quickly.
					</p>
				</div>

				{/* Quick Links */}
				<div className="flex flex-col gap-3">
					<h2 className="font-semibold text-white text-lg">Quick Links</h2>
					<ul className="flex flex-col gap-2">
						<li>
							<a href="#" className="hover:text-white transition-colors">
								Home
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="hover:text-white transition-colors"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="#howitworks"
								className="hover:text-white transition-colors"
							>
								How It Works
							</a>
						</li>
						<li>
							<a href="/login" className="hover:text-white transition-colors">
								Log In
							</a>
						</li>
					</ul>
				</div>

				{/* Contact */}
				<div className="flex flex-col gap-3">
					<h2 className="font-semibold text-white text-lg">Contact</h2>
					<p className="text-gray-400 text-sm">Maraki, Gondar, Ethiopia</p>
					<p className="text-gray-400 text-sm">Email: support@carent.com</p>
					<p className="text-gray-400 text-sm">Phone: +251 90 645 2374</p>
				</div>
			</div>

			{/* Bottom */}
			<div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-sm">
				&copy; {new Date().getFullYear()} Carent. All rights reserved.
			</div>
		</footer>
	);
};
