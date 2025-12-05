import { useUsers } from "../../api";
import { useCars, useCategories } from "../../api/catalog/query";
import { useAdminRentalsQuery } from "../../api/rental/query"; // Using the query from AdminRentals
import { useAuth } from "../../context/AuthContext";
import type { CarModel, Rental } from "../../types";

const numberOfDays = (start: string, end: string): number => {
	const startDate = new Date(start);
	const endDate = new Date(end);

	const diffTime = endDate.getTime() - startDate.getTime();

	return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
};

const calculateTotalRevenue = (rentals: Rental[]): number => {
	let totalRevenue = 0;

	rentals.forEach((rental: Rental) => {
		const dailyPrice = rental.car.daily_price;

		const days = numberOfDays(rental.start_date, rental.end_date);

		totalRevenue += days * dailyPrice;
	});

	return totalRevenue;
};

const calculateLast30DaysRevenue = (rentals: Rental[]): number => {
	let last30DaysRevenue = 0;
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	const thirtyDaysAgoTime = thirtyDaysAgo.getTime();

	rentals.forEach((rental: Rental) => {
		const startDate = new Date(rental.start_date);

		if (startDate.getTime() >= thirtyDaysAgoTime) {
			const dailyPrice = rental.car.daily_price;
			const days = numberOfDays(rental.start_date, rental.end_date);

			last30DaysRevenue += days * dailyPrice;
		}
	});

	return last30DaysRevenue;
};

const AdminDashboard = () => {
	const { user } = useAuth();
	const { data: rentals = [], isLoading: rentalsLoading } =
		useAdminRentalsQuery();
	const { data: cars = [], isLoading: carsLoading } = useCars();
	const { data: users = [], isLoading: usersLoading } = useUsers();
	const { data: categories = [], isLoading: categoriesLoading } =
		useCategories();

	const isLoading =
		rentalsLoading || carsLoading || usersLoading || categoriesLoading;

	const totalRevenue = calculateTotalRevenue(rentals as Rental[]);
	const last30DaysRevenue = calculateLast30DaysRevenue(rentals as Rental[]);

	const activeRentals = rentals.filter((r) => r.status === "rented").length;
	const completedRentals = rentals.filter(
		(r) => r.status === "returned"
	).length;

	const rentalCounts: { [carId: string]: number } = {};
	rentals.forEach((rental: Rental) => {
		const carId = rental.car.id;
		rentalCounts[carId] = (rentalCounts[carId] || 0) + 1;
	});

	let mostRentedCarModel = "N/A";
	let maxRentals = 0;
	let mostRentedCarId: string | null = null;

	for (const id in rentalCounts) {
		if (rentalCounts[id] > maxRentals) {
			maxRentals = rentalCounts[id];
			mostRentedCarId = id;
		}
	}

	if (mostRentedCarId) {
		mostRentedCarModel =
			cars.find((car: CarModel) => car.id === mostRentedCarId)?.model_name ||
			"Unknown Car";
	}

	const totalAvailableCars = cars.reduce(
		(acc, car: CarModel) => acc + car.available,
		0
	);

	const stats = [
		{
			label: "Total Revenue",
			value: `${totalRevenue.toLocaleString()} Birr`,
			color: "bg-teal-500",
			key: "total-revenue",
		},
		{
			label: "Total Cars",
			value: cars.length,
			color: "bg-blue-500",
			key: "total-cars",
		},
		{
			label: "Total Users",
			value: users.length,
			color: "bg-green-500",
			key: "total-users",
		},
		{
			label: "Active Rentals",
			value: activeRentals,
			color: "bg-purple-500",
			key: "active-rentals",
		},
		{
			label: "Completed Rentals",
			value: completedRentals,
			color: "bg-indigo-500",
			key: "completed-rentals",
		},
		{
			label: "Categories",
			value: categories.length,
			color: "bg-pink-500",
			key: "categories",
		},
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
						key={stat.key}
						className="group bg-white hover:bg-gray-950 hover:text-white transition-all p-4 rounded-xl border border-gray-200 shadow-md flex justify-between items-center cursor-pointer"
					>
						<div>
							<p className="text-gray-600 group-hover:text-gray-300 transition-all">
								{stat.label}
							</p>
							<p className="text-2xl font-bold">
								{isLoading ? "..." : stat.value}
							</p>
						</div>
						<div className={`w-3 h-12 rounded ${stat.color}`}></div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
				<div className="bg-white  p-4 rounded-xl border border-gray-200 shadow-md col-span-2 cursor-pointer">
					<p className="text-gray-600 mb-2">Revenue (Last 30 days)</p>
					<p className="text-3xl font-extrabold text-gray-950">
						{isLoading ? "..." : `${last30DaysRevenue.toLocaleString()} Birr`}
					</p>
				</div>

				<div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md flex flex-col justify-around">
					<div className="mb-4">
						<p className="text-gray-600">Most Rented Car Model</p>
						<p className="text-xl font-bold text-gray-950">
							{isLoading ? "..." : mostRentedCarModel}
						</p>
						<p className="text-sm text-gray-500">
							({maxRentals} total rentals)
						</p>
					</div>
					<div>
						<p className="text-gray-600">Total Available Cars</p>
						<p className="text-xl font-bold text-gray-950">
							{isLoading ? "..." : totalAvailableCars} / {cars.length}
							<p className="text-sm">Available / Car</p>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
