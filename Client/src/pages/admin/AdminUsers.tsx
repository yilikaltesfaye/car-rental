export default function AdminUsers() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Users Management</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4">Username</th>
							<th className="py-3 px-4">Full Name</th>
							<th className="py-3 px-4">Phone</th>
							<th className="py-3 px-4">Address</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 5 }).map((_, idx) => (
							<tr
								key={idx}
								className="border-t border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-4">ozitest</td>
								<td className="py-3 px-4">John Doe</td>
								<td className="py-3 px-4">0911223344</td>
								<td className="py-3 px-4">Addis Ababa</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
