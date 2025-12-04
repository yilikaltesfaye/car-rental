// src/pages/user/UserHome.tsx
import { useState } from "react";
import { useCategories, useCars } from "../../api/catalog/query";
import type { CarModel, Category } from "../../types";
import { Link } from "react-router";

export default function UserHome() {
	const { data: categories, isLoading: categoriesLoading } = useCategories();
	const { data: cars, isLoading: carsLoading } = useCars();
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	// Filter cars based on selected category
	const filteredCars = selectedCategory
		? cars?.filter((car) => car.category.id === selectedCategory)
		: cars;

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* Categories Section */}
			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
				<div className="flex flex-wrap gap-4">
					{categoriesLoading ? (
						<p className="text-gray-500">Loading categories...</p>
					) : (
						<>
							<div
								className={`px-6 py-4 rounded-lg cursor-pointer text-center font-medium min-w-[150px] ${
									selectedCategory === ""
										? "bg-blue-600 text-white"
										: "bg-gray-200"
								}`}
								onClick={() => setSelectedCategory("")}
							>
								All Cars
							</div>
							{categories?.map((cat: Category) => (
								<div
									key={cat.id}
									className={`px-6 py-4 rounded-lg cursor-pointer text-center font-medium min-w-[150px] ${
										selectedCategory === cat.id
											? "bg-blue-600 text-white"
											: "bg-gray-200"
									}`}
									onClick={() => setSelectedCategory(cat.id)}
								>
									{cat.name}
								</div>
							))}
						</>
					)}
				</div>
			</section>

			{/* Car Gallery Section */}
			<section>
				<h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
				{carsLoading ? (
					<p className="text-gray-500">Loading cars...</p>
				) : filteredCars?.length === 0 ? (
					<p className="text-gray-500">No cars found for this category.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{filteredCars?.map((car: CarModel) => (
							<Link to={`car/${car.id}`}>
								<div
									key={car.id}
									className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col gap-2"
								>
									<div className="h-36 bg-gray-200 rounded-md">
										{car.images?.[0] && (
											<img
												src={car.images[0].image}
												alt={car.model_name}
												className="w-full h-full object-cover rounded-md"
											/>
										)}
									</div>
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
							</Link>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
