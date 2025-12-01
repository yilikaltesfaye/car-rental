export default function RentPage() {
	return (
		<div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Rent Car</h2>

			{/* Date Range Section */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Start Date</label>
				<input type="date" className="border border-gray-300 rounded-lg p-2" />
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">End Date</label>
				<input type="date" className="border border-gray-300 rounded-lg p-2" />
			</div>

			{/* License Upload */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">
					Upload License Photo
				</label>
				<input
					type="file"
					accept="image/*"
					className="border border-gray-300 rounded-lg p-2"
				/>
				<div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
					License Preview Placeholder
				</div>
			</div>

			{/* Confirmation / Summary */}
			<div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
				<p>
					Car Model: <span className="font-medium">Car Model Placeholder</span>
				</p>
				<p>
					Rental Days: <span className="font-medium">0</span>
				</p>
				<p>
					Total Price: <span className="font-medium">0 Birr</span>
				</p>
			</div>

			{/* Submit Button */}
			<button className="w-48 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800">
				Confirm Rent
			</button>
		</div>
	);
}
