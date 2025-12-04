import { useMyRentalsQuery } from "../../api/rental/query";
import type { Rental } from "../../types";

export default function UserOrders() {
	const { data: rentals, isLoading } = useMyRentalsQuery();

	if (isLoading) return <div className="p-6">Loading your rentals...</div>;
	if (!rentals || rentals.length === 0)
		return <div className="p-6">You have no rentals yet.</div>;

	return (
		<div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">My Rentals</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4 text-left font-medium">Car Model</th>
							<th className="py-3 px-4 text-left font-medium">Category</th>
							<th className="py-3 px-4 text-left font-medium">Start Date</th>
							<th className="py-3 px-4 text-left font-medium">End Date</th>
							<th className="py-3 px-4 text-left font-medium">Status</th>
						</tr>
					</thead>
					<tbody>
						{rentals.map((rental: Rental) => (
							<tr
								key={rental.id}
								className="border-t border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-4">{rental.car.model_name}</td>
								<td className="py-3 px-4">{rental.car.category.name}</td>
								<td className="py-3 px-4">{rental.start_date}</td>
								<td className="py-3 px-4">{rental.end_date}</td>
								<td
									className={`py-3 px-4 font-medium ${
										rental.status === "rented"
											? "text-green-600"
											: rental.status === "returned"
											? "text-gray-600"
											: "text-red-600"
									}`}
								>
									{rental.status.charAt(0).toUpperCase() +
										rental.status.slice(1)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
