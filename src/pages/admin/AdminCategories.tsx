export default function AdminCategories() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Categories Management</h2>

			{/* Add Category */}
			<div className="flex flex-col gap-3 bg-white p-4 border border-gray-300 rounded-lg max-w-md">
				<input
					type="text"
					placeholder="New Category Name"
					className="border p-2 rounded"
				/>
				<button className="w-32 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
					Add Category
				</button>
			</div>

			{/* Categories Table */}
			<div className="overflow-x-auto max-w-md">
				<table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4">Category Name</th>
							<th className="py-3 px-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 4 }).map((_, idx) => (
							<tr
								key={idx}
								className="border-t border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-4">City Used Cars</td>
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
