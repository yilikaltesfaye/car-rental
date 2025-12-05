import { useState, useMemo } from "react";
import { useCategories, useCars } from "../../api/catalog/query";
import type { CarModel, Category } from "../../types";
import { Link } from "react-router";

export default function UserHome() {
	const { data: categories, isLoading: categoriesLoading } = useCategories();
	const { data: cars, isLoading: carsLoading } = useCars();
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredCars = useMemo(() => {
		let result = cars ?? [];
		if (selectedCategory)
			result = result.filter((car) => car.category.id === selectedCategory);
		if (searchTerm.trim() !== "")
			result = result.filter((car) =>
				car.model_name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		return result;
	}, [cars, selectedCategory, searchTerm]);

	const categoryName = selectedCategory
		? categories?.find((cat) => cat.id === selectedCategory)?.name
		: "All Cars";

	const categoryDescription = selectedCategory
		? categories?.find((cat) => cat.id === selectedCategory)?.description
		: "";

	return (
		<div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
			{/* Categories Sidebar */}
			<aside className="w-full md:w-64 shrink-0">
				<h2 className="text-xl font-semibold mb-4">Categories</h2>
				{categoriesLoading ? (
					<p className="text-gray-500">Loading categories...</p>
				) : (
					<div className="flex flex-col gap-3">
						<button
							className={`px-4 py-3 rounded-lg font-medium text-left w-full bg-gray-100 hover:bg-gray-200 transition-colors`}
							onClick={() => setSelectedCategory("")}
						>
							All Cars
						</button>
						{categories?.map((cat: Category) => (
							<div key={cat.id}>
								<button
									className={`px-4 py-3 rounded-lg font-medium text-left w-full bg-gray-100 hover:bg-gray-200 transition-colors`}
									onClick={() => setSelectedCategory(cat.id)}
								>
									{cat.name}
								</button>
								{selectedCategory === cat.id && cat.description && (
									<p className="text-gray-600 text-sm px-4 mt-1">
										{cat.description}
									</p>
								)}
							</div>
						))}
					</div>
				)}
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col gap-6">
				{/* Search */}
				<div className="mb-4 w-full">
					<input
						type="text"
						placeholder="Search cars..."
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				{/* Cars Section */}
				<section className="flex-1">
					<h2 className="text-2xl font-semibold mb-2">{categoryName}</h2>
					{categoryDescription && (
						<p className="text-gray-600 mb-4">{categoryDescription}</p>
					)}
					{carsLoading ? (
						<p className="text-gray-500">Loading cars...</p>
					) : filteredCars.length === 0 ? (
						<p className="text-gray-500">No cars found.</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{filteredCars.map((car: CarModel) => (
								<div
									key={car.id}
									className="bg-white border h-3xs w-xs border-gray-300 rounded-lg hover:shadow-lg transition-shadow  flex flex-col overflow-hidden"
								>
									{/* Image */}
									<div className="h-1/2 w-full bg-gray-200 overflow-hidden">
										{car.images?.[0] && (
											<img
												src={car.images[0].image}
												alt={car.model_name}
												className="w-full h-full object-cover object-bottom"
											/>
										)}
									</div>

									{/* Card content */}
									<div className="p-4 flex flex-col justify-between flex-1">
										<div className="flex flex-col gap-1">
											<h3 className="text-lg font-medium">{car.model_name}</h3>
											<p className="text-sm text-gray-600">
												Category: {car.category.name}
											</p>
											<p className="text-sm text-gray-600">
												Daily Price: {car.daily_price} Birr
											</p>
											<p className="text-sm text-gray-600">
												Available: {car.available}
											</p>
										</div>
										<Link
											to={`/user/car/${car.id}`}
											className="mt-4 bg-gray-950 hover:bg-white border border-gray-950 hover:text-black text-white py-3 rounded-lg font-bold transition-colors text-center cursor-pointer"
										>
											View Details
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
