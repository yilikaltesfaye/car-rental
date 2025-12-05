import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAdminRentalsQuery } from "../../api/rental/query";
import { useReturnRentalMutation } from "../../api/rental/mutation";
import { useUsers } from "../../api";

export default function AdminRentals() {
	const { data: rentals, isLoading } = useAdminRentalsQuery();
	const returnMutation = useReturnRentalMutation();
	const { data: users } = useUsers();

	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const openImageModal = (url: string) => {
		setSelectedImage(url);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
		setSelectedImage(null);
	};

	const handleReturn = async (id: string) => {
		await returnMutation.mutateAsync(id);
	};

	const numberOfDays = (start: string, end: string) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const diffTime = endDate.getTime() - startDate.getTime();
		return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1); // minimum 1 day
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold text-gray-950">
				Rentals Management
			</h2>

			<div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-md mt-4">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100 rounded-t-xl">
						<tr>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Renter
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Car Model
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Start
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								End
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								License
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Price
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Status
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Actions
							</th>
						</tr>
					</thead>

					<tbody>
						{isLoading ? (
							<tr>
								<td
									colSpan={8}
									className="text-center py-6 text-gray-500 italic"
								>
									Loading rentals…
								</td>
							</tr>
						) : rentals?.length === 0 ? (
							<tr>
								<td
									colSpan={8}
									className="text-center py-6 text-gray-500 italic"
								>
									No rentals available.
								</td>
							</tr>
						) : (
							rentals?.map((r) => {
								const days = numberOfDays(r.start_date, r.end_date);
								const rentalPrice = days * r.car.daily_price;

								return (
									<tr
										key={r.id}
										className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
									>
										<td className="py-3 px-4">
											{users?.find((u) => u.username === r.user)?.full_name ||
												r.user}
										</td>
										<td className="py-3 px-4">{r.car.model_name}</td>
										<td className="py-3 px-4">
											{new Date(r.start_date).toLocaleDateString()}
										</td>
										<td className="py-3 px-4">
											{new Date(r.end_date).toLocaleDateString()}
										</td>

										<td className="py-3 px-4">
											{r.license_image ? (
												<button
													className="text-blue-700 underline hover:text-blue-900 transition"
													onClick={() => openImageModal(r.license_image!)}
												>
													View
												</button>
											) : (
												<span className="text-gray-500">None</span>
											)}
										</td>

										<td className="py-3 px-4 font-medium">
											{rentalPrice} Birr
										</td>

										<td className="py-3 px-4 font-medium">
											{r.status === "returned" ? (
												<span className="text-green-600">Returned</span>
											) : (
												<span className="text-yellow-600">Rented</span>
											)}
										</td>

										<td className="py-3 px-4 flex gap-2">
											{r.status === "rented" ? (
												<button
													onClick={() => handleReturn(r.id)}
													disabled={returnMutation.isPending}
													className="px-3 py-1 rounded bg-gray-950 text-white hover:bg-white hover:text-black border border-gray-950 transition"
												>
													{returnMutation.isPending
														? "Processing…"
														: "Mark Returned"}
												</button>
											) : (
												<span className="text-gray-400">—</span>
											)}
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			<Transition appear show={isImageModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-20" onClose={closeImageModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
								<Dialog.Title className="text-lg font-medium mb-4">
									License Image
								</Dialog.Title>

								{selectedImage && (
									<img
										src={selectedImage}
										alt="License"
										className="w-full rounded border"
									/>
								)}

								<div className="mt-4 text-right">
									<button
										className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
										onClick={closeImageModal}
									>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
