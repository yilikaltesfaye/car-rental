import { useEffect, useRef, useState } from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import CarLineIcon from "remixicon-react/CarLineIcon";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon";

const works = [
	{
		label: "Join and Explore Our Platform",
		description:
			"Login or register on our platform and explore our car collection, viewing vehicles available on the home page.",
		icon: UserLineIcon,
		image:
			"https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?cs=srgb&dl=pexels-negativespace-97079.jpg&fm=jpg&w=1200",
		span: "h-64",
	},
	{
		label: "Discover Your Perfect Car",
		description:
			"Choose a vehicle that suits your purpose best and plan your perfect trip.",
		icon: CarLineIcon,
		span: "h-64",
		collage: [
			"https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?cs=srgb&dl=pexels-pixabay-164634.jpg&fm=jpg&w=600",
			"https://images.pexels.com/photos/12463311/pexels-photo-12463311.jpeg?cs=srgb&dl=pexels-mikebird-12463311.jpg&fm=jpg&w=600",
			"https://images.pexels.com/photos/173390/pexels-photo-173390.jpeg?cs=srgb&dl=pexels-snapwire-173390.jpg&fm=jpg&w=600",
			"https://images.pexels.com/photos/16925903/pexels-photo-16925903.jpeg?cs=srgb&dl=pexels-bryanhave-16925903.jpg&fm=jpg&w=600",
		],
	},
	{
		label: "Book Your Preferred Rental Car",
		description:
			"Rent your chosen car for the desired period with ease and security.",
		icon: CalendarLineIcon,
		image:
			"https://images.pexels.com/photos/5751181/pexels-photo-5751181.jpeg?cs=srgb&dl=pexels-bert-christiaens-2570221-5751181.jpg&fm=jpg&w=1600",
		span: "md:col-span-2 h-80",
	},
];

const Works = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="m-10" id="howitworks" ref={sectionRef}>
			<div className="text-black m-3 md:m-5 rounded-2xl p-6 md:p-10 flex flex-col gap-12 justify-baseline font-inter">
				<div
					className={`flex flex-col gap-7 transition-all duration-700 ${
						visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					<h2 className="text-3xl md:text-4xl font-bold text-primary">
						How It Works
					</h2>
					<div className="flex flex-col justify-between items-start gap-6">
						<h3 className="text-xl md:text-3xl font-semibold leading-snug">
							Step by Step to Rent a Car on Our Platform
						</h3>
						<p className="text-sm md:text-base text-base-content/70 max-w-xl">
							We provide a seamless and simple car rental experience with
							transparent steps. Follow these instructions to rent your
							preferred car quickly.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{works.map((w, i) => (
						<div
							key={w.label}
							className={`group relative overflow-hidden rounded-xl shadow-md border-2 border-base-300 hover:shadow-2xl transition-all duration-700 ${
								w.span
							} ${
								visible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
							style={{
								transitionDelay: visible ? `${150 * (i + 1)}ms` : "0ms",
							}}
						>
							{/* Background image — single photo or a collage, both scale together on hover */}
							{w.collage ? (
								<div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 scale-110 transition-transform duration-700 ease-out group-hover:scale-125">
									{w.collage.map((src) => (
										<div
											key={src}
											className="bg-cover bg-center"
											style={{ backgroundImage: `url('${src}')` }}
										/>
									))}
								</div>
							) : (
								<div
									className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-700 ease-out group-hover:scale-125"
									style={{ backgroundImage: `url('${w.image}')` }}
								/>
							)}

							{/* Overlay for legibility, darkens further on hover */}
							<div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />

							<div className="relative z-10 h-full flex flex-col justify-end gap-3 p-6 text-white">
								<div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 flex items-center justify-center w-fit transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
									<div className="bg-white/10 p-4 rounded-full">
										<w.icon className="w-7 h-7" />
									</div>
								</div>
								<p className="font-bold text-lg">{w.label}</p>
								<p className="text-sm text-gray-200">{w.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Works;
