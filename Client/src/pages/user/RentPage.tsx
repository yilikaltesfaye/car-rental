import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useCarById } from "../../api/catalog/query";
import { useCreateRentalMutation } from "../../api/rental/mutation";
import type { CreateRentalPayload } from "../../types";

export default function RentPage() {
	const params = useParams();
	const carId = params.carId;
	const navigate = useNavigate();

	const { data: car, isLoading } = useCarById(carId || "", !!carId); // fetch car details
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [licenseFile, setLicenseFile] = useState<File | null>(null);

	const createRentalMutation = useCreateRentalMutation();

	const rentalDays =
		startDate && endDate
			? Math.max(
					0,
					Math.ceil(
						(new Date(endDate).getTime() - new Date(startDate).getTime()) /
							(1000 * 60 * 60 * 24)
					)
			  )
			: 0;

	const totalPrice = rentalDays * (car?.daily_price || 0);

	const handleSubmit = async () => {
		if (!startDate || !endDate || !car) return;
		const payload: CreateRentalPayload = {
			car_id: car.id,
			start_date: startDate,
			end_date: endDate,
			license_image: licenseFile,
		};
		await createRentalMutation.mutateAsync(payload);
		navigate("/user/orders"); // redirect to user rentals page
	};

	if (isLoading) return <div>Loading car details...</div>;
	if (!car) return <div>Car not found</div>;

	return (
		<div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Rent {car.model_name}</h2>

			{/* Date Range */}
			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">Start Date</label>
				<input
					type="date"
					className="border border-gray-300 rounded-lg p-2"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-gray-700 font-medium">End Date</label>
				<input
					type="date"
					className="border border-gray-300 rounded-lg p-2"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
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
					onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
				/>
				{licenseFile && (
					<div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
						<img
							src={URL.createObjectURL(licenseFile)}
							alt="License Preview"
							className="h-full object-contain"
						/>
					</div>
				)}
			</div>

			{/* Confirmation */}
			<div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
				<p>
					Car Model: <span className="font-medium">{car.model_name}</span>
				</p>
				<p>
					Rental Days: <span className="font-medium">{rentalDays}</span>
				</p>
				<p>
					Total Price: <span className="font-medium">{totalPrice} Birr</span>
				</p>
			</div>

			{/* Submit Button */}
			<button
				disabled={!startDate || !endDate || !licenseFile || rentalDays === 0}
				onClick={handleSubmit}
				className="w-48 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				{createRentalMutation.isPending ? "Processing..." : "Confirm Rent"}
			</button>
		</div>
	);
}
