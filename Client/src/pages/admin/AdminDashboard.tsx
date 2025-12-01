export default function AdminDashboard() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Dashboard</h2>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				<div className="bg-white p-4 rounded-lg border border-gray-300">
					<p className="text-gray-600">Total Cars</p>
					<p className="text-xl font-bold">50</p>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-300">
					<p className="text-gray-600">Total Users</p>
					<p className="text-xl font-bold">120</p>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-300">
					<p className="text-gray-600">Active Rentals</p>
					<p className="text-xl font-bold">35</p>
				</div>
			</div>
		</div>
	);
}
