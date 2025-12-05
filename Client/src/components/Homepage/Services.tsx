import CarLineIcon from "remixicon-react/CarLineIcon";
import ShieldLineIcon from "remixicon-react/ShieldLineIcon";
import PhoneLineIcon from "remixicon-react/PhoneLineIcon";

const Services = () => {
	const service = [
		{
			label: "Well-Maintained Car",
			description:
				"Enjoy your trip in peace and comfort with our car rental which offers a well maintained fleer, priortize the health and safety of our vehicles",
			icon: CarLineIcon,
		},
		{
			label: "Secure platform",
			description:
				"with a safe and reliable system, you can continue your journey with peace of mind without worring about our platform security",
			icon: ShieldLineIcon,
		},
		{
			label: "24/7 Support",
			description:
				"We Understand that the journey donesn't always run smoothly. Therefore, our customer support team is ready to help you 24/7",
			icon: PhoneLineIcon,
		},
	];
	return (
		<div className="m-10 rounded-2xl bg-gray-950" id="services">
			<div className="bg-gray-950 text-white m-3 md:m-5 rounded-2xl p-6 md:p-10 flex flex-col gap-8 font-inter">
				<h2 className="text-2xl md:text-3xl font-bold text-indigo-700">
					Our Services
				</h2>
				<div className="rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
					<h3 className="text-xl md:text-4xl font-semibold leading-snug max-w-xl">
						Our Premier Services for Your Car Rental Needs
					</h3>
					<p className="mt-2 md:mt-0 text-sm md:text-base text-gray-300 max-w-md">
						We take pride in providing top-notch solutions! Our premier services
						ensure a seamless and simple car rental experience, offering cars
						that suit your preferences.
					</p>
				</div>

				<div className="flex flex-row flex-wrap justify-between gap-6">
					{service.map((s) => (
						<div
							key={s.label}
							id={s.label}
							className="bg-gray-900 text-white rounded-xl p-6 flex flex-col items-start gap-12 shadow-lg hover:shadow-2xl transition-shadow flex-1 min-w-[250px] max-w-[32%] min-h-[220px]"
						>
							<div className="bg-gray-800 text-white rounded-full p-1.5 text-5xl flex items-center justify-center">
								<div className="bg-gray-700 p-6 rounded-full">
									<s.icon className="w-10 h-10" />
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<p className="font-bold text-lg">{s.label}</p>
								<p className="text-sm text-gray-300">{s.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Services;
