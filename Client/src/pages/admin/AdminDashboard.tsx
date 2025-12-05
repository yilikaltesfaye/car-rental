import { useUsers } from "../../api";
import { useAdminRentalSummary } from "../../api/adminpanel/query";
import { useCars, useCategories } from "../../api/catalog/query";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
	const { user } = useAuth();
	const { data: rentalSummary = [], isLoading } = useAdminRentalSummary();
	const { data: cars = [] } = useCars();
	const { data: users = [] } = useUsers();
	const { data: categories = [] } = useCategories();

	const activeRentals = rentalSummary.reduce(
		(acc, u) => acc + u.rentals.filter((r) => r.status === "rented").length,
		0
	);
	const completedRentals = rentalSummary.reduce(
		(acc, u) => acc + u.rentals.filter((r) => r.status === "returned").length,
		0
	);

	const stats = [
		{ label: "Total Cars", value: cars.length, color: "bg-blue-500" },
		{ label: "Total Users", value: users.length, color: "bg-green-500" },
		{ label: "Active Rentals", value: activeRentals, color: "bg-purple-500" },
		{
			label: "Completed Rentals",
			value: completedRentals,
			color: "bg-indigo-500",
		},
		{ label: "Categories", value: categories.length, color: "bg-pink-500" },
	];

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h2 className="text-2xl font-semibold text-gray-950">
					Welcome back, {user?.username.toUpperCase()}
				</h2>
				<p className="text-gray-700">Full Name: {user?.full_name}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="bg-gray-50 hover:bg-gray-950 hover:text-white transition-all p-4 rounded-xl border border-gray-200 shadow-md flex justify-between items-center cursor-pointer"
					>
						<div>
							<p className="text-gray-600">{stat.label}</p>
							<p className="text-2xl font-bold">
								{isLoading ? "..." : stat.value}
							</p>
						</div>
						<div className={`w-3 h-12 rounded ${stat.color}`}></div>
					</div>
				))}
			</div>

			{/* Revenue / Graph section placeholder */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
				<div className="bg-gray-50 hover:bg-gray-950 hover:text-white transition-all p-4 rounded-xl border border-gray-200 shadow-md col-span-2 cursor-pointer">
					<p className="text-gray-600 mb-2">Revenue (Last 30 days)</p>
					<div className="h-40 flex items-center justify-center text-gray-400">
						Chart Placeholder
					</div>
				</div>
				<div className="bg-gray-50 hover:bg-gray-950 hover:text-white transition-all p-4 rounded-xl border border-gray-200 shadow-md cursor-pointer">
					<p className="text-gray-600 mb-2">Most Active Category</p>
					<div className="h-40 flex items-center justify-center text-gray-400">
						Pie Chart Placeholder
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
