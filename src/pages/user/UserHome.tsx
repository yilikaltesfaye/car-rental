// src/pages/user/UserHome.tsx

export default function UserHome() {
	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* Categories Section */}
			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
				<div className="flex flex-wrap gap-4">
					<div className="bg-gray-200 px-6 py-4 rounded-lg cursor-pointer text-center font-medium min-w-[150px]">
						City Used Cars
					</div>
					<div className="bg-gray-200 px-6 py-4 rounded-lg cursor-pointer text-center font-medium min-w-[150px]">
						Vacation Used Cars
					</div>
					<div className="bg-gray-200 px-6 py-4 rounded-lg cursor-pointer text-center font-medium min-w-[150px]">
						Tour Used Cars
					</div>
					<div className="bg-gray-200 px-6 py-4 rounded-lg cursor-pointer text-center font-medium min-w-[150px]">
						Bridal Cars
					</div>
				</div>
			</section>

			{/* Car Gallery Section */}
			<section>
				<h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, idx) => (
						<div
							key={idx}
							className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col gap-2"
						>
							<div className="h-36 bg-gray-200 rounded-md"></div>
							<h3 className="text-lg font-medium">Car Model</h3>
							<p className="text-sm text-gray-600">Category: Placeholder</p>
							<p className="text-sm text-gray-600">Daily Price: 0 Birr</p>
							<p className="text-sm text-gray-600">Available: 0</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
