import UserLineIcon from "remixicon-react/UserLineIcon";
import CarLineIcon from "remixicon-react/CarLineIcon";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon";
const Works = () => {
	const work = [
		{
			label: "Join and Explore Our Platform",
			description:
				"Login or register on our platform and explore our car collection, viewing vehicles available on the home page.",
			icon: UserLineIcon,
		},
		{
			label: "Discover Your Perfect Car",
			description:
				"Choose a vehicle that suits your purpose best and plan your perfect trip.",
			icon: CarLineIcon,
		},
		{
			label: "Book Your Preferred Rental Car",
			description:
				"Rent your chosen car for the desired period with ease and security.",
			icon: CalendarLineIcon,
		},
	];

	return (
		<div className="m-10" id="howitworks">
			<div className="text-black m-3 md:m-5 rounded-2xl p-6 md:p-10 flex flex-col gap-12 justify-baseline font-inter">
				{/* Section Title */}
				<div className="flex flex-col gap-7">
					<h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
						How It Works
					</h2>
					{/* Subtitle */}
					<div className="flex flex-col justify-between items-start  gap-6">
						<h3 className="text-xl md:text-3xl font-semibold leading-snug">
							Step by Step to Rent a Car on Our Platform
						</h3>
						<p className="text-sm md:text-base text-gray-700 max-w-xl">
							We provide a seamless and simple car rental experience with
							transparent steps. Follow these instructions to rent your
							preferred car quickly.
						</p>
					</div>
				</div>
				<div>
					<div className="flex flex-wrap flex-col item gap-6 justify-between">
						{work.map((w) => (
							<div
								key={w.label}
								id={w.label}
								className="bg-white rounded-xl p-6 flex flex-row items-center gap-6 shadow-md border-2 border-gray-500 hover:shadow-xl transition-shadow flex-1 min-w-[250px] max-w-[32%] md:max-w-[30%] lg:max-w-[75%] h-40"
							>
								{/* Icon */}
								<div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
									<w.icon className="w-10 h-10" />
								</div>

								{/* Text */}
								<div className="flex flex-col gap-1">
									<p className="font-bold text-lg">{w.label}</p>
									<p className="text-sm text-gray-700">{w.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Works;
