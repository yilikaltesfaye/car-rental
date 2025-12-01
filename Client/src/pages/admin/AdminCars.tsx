export default function AdminCars() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Cars Management</h2>

			{/* Add New Car */}
			<div className="bg-white p-4 rounded-lg border border-gray-300">
				<h3 className="font-medium mb-2">Add New Car</h3>
				<div className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="Model Name"
						className="border p-2 rounded"
					/>
					<input
						type="number"
						placeholder="Daily Price"
						className="border p-2 rounded"
					/>
					<input
						type="number"
						placeholder="Quantity"
						className="border p-2 rounded"
					/>
					<select className="border p-2 rounded">
						<option>City Used Cars</option>
						<option>Vacation Used Cars</option>
						<option>Tour Used Cars</option>
						<option>Bridal Cars</option>
					</select>
					<button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-32">
						Add Car
					</button>
				</div>
			</div>

			{/* Cars Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4 text-left">Model</th>
							<th className="py-3 px-4 text-left">Category</th>
							<th className="py-3 px-4 text-left">Price</th>
							<th className="py-3 px-4 text-left">Available</th>
							<th className="py-3 px-4 text-left">Actions</th>
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
								<td className="py-3 px-4">1200 Birr</td>
								<td className="py-3 px-4">5</td>
								<td className="py-3 px-4 flex gap-2">
									<button className="bg-yellow-500 text-white px-2 py-1 rounded">
										Edit
									</button>
									<button className="bg-red-600 text-white px-2 py-1 rounded">
										Delete
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
