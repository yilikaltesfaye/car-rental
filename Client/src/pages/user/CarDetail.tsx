// src/pages/user/CarDetail.tsx
import { Link, useParams } from "react-router";
import { useCarById, useCategories } from "../../api/catalog/query";

export default function CarDetail() {
	const { carId } = useParams();
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
		<div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
			{/* Left: Car Image */}
			<div className="md:w-1/2 w-full h-80 md:h-auto bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
				{car.images?.[0] ? (
					<img
						src={car.images[0].image}
						alt={car.model_name}
						className="w-full h-full object-contain"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-500">
						No Image Available
					</div>
				)}
			</div>

			{/* Right: Car Details */}
			<div className="md:w-1/2 w-full flex flex-col gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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

				<Link to={`/user/rent/${car.id}`} className="mt-auto">
					<button
						className={`w-48 py-3 rounded-lg font-bold transition-colors text-center ${
							car.available > 0
								? "bg-gray-950 text-white hover:bg-white hover:text-black border border-gray-950"
								: "bg-gray-400 text-gray-700 cursor-not-allowed"
						}`}
						disabled={car.available <= 0}
					>
						{car.available > 0 ? "Rent This Car" : "Not Available"}
					</button>
				</Link>
			</div>
		</div>
	);
}
