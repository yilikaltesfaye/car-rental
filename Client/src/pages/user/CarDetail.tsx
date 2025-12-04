// src/pages/user/CarDetail.tsx
import { Link, useParams } from "react-router";
import { useCarById, useCategories } from "../../api/catalog/query";

export default function CarDetail() {
	const params = useParams();
	const carId = params.carId; // Extract id from route
	console.log(carId);
	// Fetch car by ID only if carId exists
	const {
		data: car,
		isLoading: carLoading,
		isError: carError,
	} = useCarById(carId || "", true);
	const { data: categories } = useCategories();

	if (carLoading) {
		return (
			<div className="p-6 text-center text-gray-500">
				Loading car details...
			</div>
		);
	}

	if (carError || !car) {
		return <div className="p-6 text-center text-red-500">Car not found.</div>;
	}

	const categoryName =
		categories?.find((c) => c.id === car.category.id)?.name ||
		"Unknown Category";

	return (
		<div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
			{/* Car Image */}
			<div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
				{car.images?.[0] ? (
					<img
						src={car.images[0].image}
						alt={car.model_name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-500">
						No Image Available
					</div>
				)}
			</div>

			{/* Car Details */}
			<div className="flex flex-col gap-3">
				<h2 className="text-2xl font-semibold">{car.model_name}</h2>
				<p className="text-gray-700">
					Category: <span className="font-medium">{categoryName}</span>
				</p>
				<p className="text-gray-700">
					Daily Price:{" "}
					<span className="font-medium">{car.daily_price} Birr</span>
				</p>
				<p className="text-gray-700">
					Availability: <span className="font-medium">{car.available}</span>
				</p>
				<p className="text-gray-600">
					{car.category.description || "No description provided."}
				</p>
			</div>

			{/* Rent Button */}
			<Link to={`/user/rent/${car.id}`}>
				<button
					className={`w-48 px-6 py-3 rounded-lg font-medium ${
						car.available > 0
							? "bg-blue-700 text-white hover:bg-blue-800"
							: "bg-gray-400 text-gray-700 cursor-not-allowed"
					}`}
					disabled={car.available <= 0}
				>
					{car.available > 0 ? "Rent This Car" : "Not Available"}
				</button>
			</Link>
		</div>
	);
}
