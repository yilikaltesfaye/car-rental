import { useEffect, useRef, useState } from "react";
import CarLineIcon from "remixicon-react/CarLineIcon";
import ShieldLineIcon from "remixicon-react/ShieldLineIcon";
import PhoneLineIcon from "remixicon-react/PhoneLineIcon";

const service = [
	{
		label: "Well-Maintained Car",
		description:
			"Enjoy your trip in peace and comfort with our car rental which offers a well maintained fleet, prioritizing the health and safety of our vehicles.",
		icon: CarLineIcon,
		image:
			"https://images.pexels.com/photos/8478233/pexels-photo-8478233.jpeg?cs=srgb&dl=pexels-19x14-8478233.jpg&fm=jpg&w=1200",
		span: "md:col-span-2 md:row-span-2 w-full",
	},
	{
		label: "Secure Platform",
		description:
			"With a safe and reliable system, you can continue your journey with peace of mind without worrying about our platform's security.",
		icon: ShieldLineIcon,
		image:
			"https://images.pexels.com/photos/11391947/pexels-photo-11391947.jpeg?cs=srgb&dl=pexels-towfiqu-barbhuiya-3440682-11391947.jpg&fm=jpg&w=1000",
		span: "md:col-span-3 md:row-span-2",
	},
	{
		label: "24/7 Support",
		description:
			"We understand that the journey doesn't always run smoothly. Therefore, our customer support team is ready to help you 24/7.",
		icon: PhoneLineIcon,
		image:
			"https://images.pexels.com/photos/7504886/pexels-photo-7504886.jpeg?cs=srgb&dl=pexels-olha-ruskykh-7504886.jpg&fm=jpg&w=1000",
		span: "md:col-span-3 md:row-span-2",
	},
];

const Services = () => {
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
		<div className="m-10 rounded-2xl" id="services" ref={sectionRef}>
			<div className="m-3 md:m-5 rounded-2xl p-6 md:p-10 flex flex-col gap-8 font-inter">
				<h2
					className={`text-2xl md:text-3xl font-bold text-primary transition-all duration-700 ${
						visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					Our Services
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 w-full">
					<div
						className={`rounded-2xl flex flex-col items-start md:col-span-4 md:row-span-2 transition-all duration-700 ${
							visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
						}`}
					>
						<h3 className="text-xl md:text-4xl font-semibold leading-snug max-w-xl">
							Our Premier Services for Your Car Rental Needs
						</h3>
						<p className="mt-2 md:mt-0 text-sm md:text-base text-base-content/70 max-w-md">
							We take pride in providing top-notch solutions! Our premier
							services ensure a seamless and simple car rental experience,
							offering cars that suit your preferences.
						</p>
					</div>

					{service.map((s, i) => (
						<div
							key={s.label}
							id={s.label}
							className={`group relative overflow-hidden rounded-xl p-6 flex flex-col items-start gap-12 shadow-lg hover:shadow-2xl transition-all duration-700 flex-1 min-w-[250px] min-h-[220px] ${
								s.span
							} ${
								visible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
							style={{
								transitionDelay: visible ? `${150 * (i + 1)}ms` : "0ms",
							}}
						>
							{/* Background image */}
							<div
								className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-700 ease-out group-hover:scale-125"
								style={{ backgroundImage: `url('${s.image}')` }}
							/>
							{/* Overlay for legibility, darkens further on hover */}
							<div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />

							<div className="relative z-10 flex flex-col items-start gap-12 h-full">
								<div className="bg-white/10 backdrop-blur-sm text-white rounded-full p-1.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
									<div className="bg-white/10 p-6 rounded-full">
										<s.icon className="w-10 h-10" />
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<p className="font-bold text-lg text-white">{s.label}</p>
									<p className="text-sm text-gray-200">{s.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Services;
