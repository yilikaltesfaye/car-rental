export default function AdminRentals() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Rentals Management</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4">Renter</th>
							<th className="py-3 px-4">Car Model</th>
							<th className="py-3 px-4">Start Date</th>
							<th className="py-3 px-4">End Date</th>
							<th className="py-3 px-4">Status</th>
							<th className="py-3 px-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 5 }).map((_, idx) => (
							<tr
								key={idx}
								className="border-t border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-4">John Doe</td>
								<td className="py-3 px-4">Toyota Corolla</td>
								<td className="py-3 px-4">2025-01-10</td>
								<td className="py-3 px-4">2025-01-12</td>
								<td className="py-3 px-4 font-medium text-green-600">
									Ongoing
								</td>
								<td className="py-3 px-4">
									<button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">
										Mark Returned
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
