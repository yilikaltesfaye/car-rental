export default function UserOrders() {
	return (
		<div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">My Rentals</h2>

			{/* Orders Table */}
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
						{Array.from({ length: 5 }).map((_, idx) => (
							<tr
								key={idx}
								className="border-t border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-4">Toyota Corolla</td>
								<td className="py-3 px-4">City Used Cars</td>
								<td className="py-3 px-4">2025-01-10</td>
								<td className="py-3 px-4">2025-01-12</td>
								<td className="py-3 px-4 font-medium text-green-600">
									Ongoing
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
