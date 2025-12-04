import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAdminRentalsQuery } from "../../api/rental/query";
import { useReturnRentalMutation } from "../../api/rental/mutation";

export default function AdminRentals() {
	const { data: rentals, isLoading } = useAdminRentalsQuery();
	const returnMutation = useReturnRentalMutation();

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

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Rentals Management</h2>

			<div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4">Renter</th>
							<th className="py-3 px-4">Car Model</th>
							<th className="py-3 px-4">Start</th>
							<th className="py-3 px-4">End</th>
							<th className="py-3 px-4">License</th>
							<th className="py-3 px-4">Created</th>
							<th className="py-3 px-4">Status</th>
							<th className="py-3 px-4">Actions</th>
						</tr>
					</thead>

					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan={9} className="text-center py-6">
									Loading rentals…
								</td>
							</tr>
						) : rentals?.length === 0 ? (
							<tr>
								<td colSpan={9} className="text-center py-6 text-gray-500">
									No rentals available.
								</td>
							</tr>
						) : (
							rentals?.map((r) => (
								<tr
									key={r.id}
									className="border-t border-gray-200 hover:bg-gray-50"
								>
									<td className="py-3 px-4">{r.user.full_name}</td>
									<td className="py-3 px-4">{r.car.model_name}</td>
									<td className="py-3 px-4">{r.start_date}</td>
									<td className="py-3 px-4">{r.end_date}</td>

									<td className="py-3 px-4">
										{r.license_image ? (
											<button
												className="text-blue-700 underline"
												onClick={() => openImageModal(r.license_image!)}
											>
												View
											</button>
										) : (
											<span className="text-gray-500">None</span>
										)}
									</td>

									<td className="py-3 px-4">
										{new Date(r.created_at).toLocaleString()}
									</td>

									<td className="py-3 px-4 font-medium">
										{r.status === "returned" ? (
											<span className="text-green-600">Returned</span>
										) : (
											<span className="text-yellow-600">Rented</span>
										)}
									</td>

									<td className="py-3 px-4">
										{r.status === "rented" ? (
											<button
												onClick={() => handleReturn(r.id)}
												disabled={returnMutation.isPending}
												className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
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
							))
						)}
					</tbody>
				</table>
			</div>

			{/* License Image Modal */}
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
							<Dialog.Panel className="max-w-3xl bg-white p-6 rounded-lg shadow-lg">
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
										className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
