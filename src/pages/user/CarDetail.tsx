// src/pages/user/CarDetail.tsx

export default function CarDetail() {
	return (
		<div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
			{/* Car Image */}
			<div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
				{/* Image placeholder */}
			</div>

			{/* Car Details */}
			<div className="flex flex-col gap-3">
				<h2 className="text-2xl font-semibold">Car Model Placeholder</h2>
				<p className="text-gray-700">
					Category: <span className="font-medium">Category Placeholder</span>
				</p>
				<p className="text-gray-700">
					Daily Price: <span className="font-medium">0 Birr</span>
				</p>
				<p className="text-gray-700">
					Availability: <span className="font-medium">0 available</span>
				</p>
				<p className="text-gray-600">
					Description placeholder for car details and usage notes. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit.
				</p>
			</div>

			{/* Rent Button */}
			<button
				className="w-48 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
				disabled={false} // replace with logic later
			>
				Rent This Car
			</button>
		</div>
	);
}
