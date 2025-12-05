import { useMyRentalsQuery } from "../../api/rental/query";
import type { Rental } from "../../types";

export default function UserOrders() {
	const { data: rentals, isLoading } = useMyRentalsQuery();

	if (isLoading)
		return (
			<div className="p-6 text-center text-gray-500">
				Loading your rentals...
			</div>
		);
	if (!rentals || rentals.length === 0)
		return (
			<div className="p-6 text-center text-gray-500">
				You have no rentals yet.
			</div>
		);

	return (
		<div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">My Rentals</h2>

			<div className="flex flex-col gap-4">
				{rentals.map((rental: Rental) => (
					<div
						key={rental.id}
						className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="flex flex-col md:flex-row md:gap-6 gap-2">
							<p className="font-medium">
								Car:{" "}
								<span className="font-normal">{rental.car.model_name}</span>
							</p>
							<p className="font-medium">
								Category:{" "}
								<span className="font-normal">{rental.car.category.name}</span>
							</p>
							<p className="font-medium">
								Start: <span className="font-normal">{rental.start_date}</span>
							</p>
							<p className="font-medium">
								End: <span className="font-normal">{rental.end_date}</span>
							</p>
						</div>
						<div
							className={`mt-2 md:mt-0 font-semibold ${
								rental.status === "rented"
									? "text-green-600"
									: rental.status === "returned"
									? "text-gray-600"
									: "text-red-600"
							}`}
						>
							{rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
