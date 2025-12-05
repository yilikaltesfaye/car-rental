import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useCars, useCategories } from "../../api/catalog/query";
import {
	useCreateCar,
	useUpdateCar,
	useDeleteCar,
	useMoveCar,
} from "../../api/catalog/mutation";
import type { CarModelCreatePayload } from "../../types";

export default function AdminCars() {
	const queryClient = useQueryClient();
	const { data: cars, isLoading: carsLoading } = useCars();
	const { data: categories } = useCategories();

	const createMutation = useCreateCar();
	const updateMutation = useUpdateCar();
	const deleteMutation = useDeleteCar();
	const moveMutation = useMoveCar();

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [createFormData, setCreateFormData] = useState<CarModelCreatePayload>({
		category_id: "",
		model_name: "",
		daily_price: 0,
		total_count: 0,
		available: 0,
		images: [],
	});

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editFormData, setEditFormData] = useState<
		Partial<CarModelCreatePayload>
	>({});
	const [editingCarId, setEditingCarId] = useState<string | null>(null);

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

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		isEdit: boolean
	) => {
		const files = e.target.files;
		if (!files) return;
		const arr = Array.from(files);
		if (isEdit) {
			setEditFormData((prev) => ({ ...prev, images: arr }));
		} else {
			setCreateFormData((prev) => ({ ...prev, images: arr }));
		}
	};

	const handleCreateSubmit = async () => {
		if (!createFormData.model_name || !createFormData.category_id) return;
		await createMutation.mutateAsync(createFormData);
		setCreateFormData({
			category_id: "",
			model_name: "",
			daily_price: 0,
			total_count: 0,
			available: 0,
			images: [],
		});
		setIsCreateModalOpen(false);
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	const handleEditSubmit = async () => {
		if (!editingCarId) return;
		const payload: Partial<CarModelCreatePayload> = { ...editFormData };
		if (!editFormData.images?.length) delete payload.images;
		await updateMutation.mutateAsync({ id: editingCarId, payload });
		setEditFormData({});
		setEditingCarId(null);
		setIsEditModalOpen(false);
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this car?")) return;
		await deleteMutation.mutateAsync(id);
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	const handleMoveCategory = async (id: string, category_id: string) => {
		await moveMutation.mutateAsync({ id, payload: { category_id } });
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold text-gray-950">Cars Management</h2>

			<button
				className="self-end w-56 px-8 py-3 bg-gray-950 text-white rounded-lg border border-gray-950 hover:bg-white hover:text-black transition"
				onClick={() => setIsCreateModalOpen(true)}
			>
				Add New Car
			</button>

			<Transition appear show={isCreateModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-20"
					onClose={() => setIsCreateModalOpen(false)}
				>
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
									Add New Car
								</Dialog.Title>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Model Name
										</label>
										<input
											type="text"
											value={createFormData.model_name}
											onChange={(e) =>
												setCreateFormData((prev) => ({
													...prev,
													model_name: e.target.value,
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Daily Price
										</label>
										<input
											type="number"
											value={createFormData.daily_price}
											onChange={(e) =>
												setCreateFormData((prev) => ({
													...prev,
													daily_price: Number(e.target.value),
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Total Count
										</label>
										<input
											type="number"
											value={createFormData.total_count}
											onChange={(e) =>
												setCreateFormData((prev) => ({
													...prev,
													total_count: Number(e.target.value),
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Available
										</label>
										<input
											type="number"
											value={createFormData.available}
											onChange={(e) =>
												setCreateFormData((prev) => ({
													...prev,
													available: Number(e.target.value),
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col col-span-2">
										<label className="font-medium text-gray-700">
											Category
										</label>
										<select
											value={createFormData.category_id}
											onChange={(e) =>
												setCreateFormData((prev) => ({
													...prev,
													category_id: e.target.value,
												}))
											}
											className="border p-2 rounded w-full"
										>
											<option value="">Select Category</option>
											{categories?.map((cat) => (
												<option key={cat.id} value={cat.id}>
													{cat.name}
												</option>
											))}
										</select>
									</div>
									<div className="flex flex-col col-span-2">
										<label className="font-medium text-gray-700">Images</label>
										<input
											type="file"
											multiple
											onChange={(e) => handleFileChange(e, false)}
											className="border p-2 rounded w-full"
										/>
									</div>
								</div>

								<div className="mt-4 flex justify-end gap-2">
									<button
										className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
										onClick={() => setIsCreateModalOpen(false)}
									>
										Cancel
									</button>
									<button
										className="px-4 py-2 bg-gray-950 text-white rounded border border-gray-950 hover:bg-white hover:text-black transition"
										onClick={handleCreateSubmit}
									>
										{createMutation.isPending ? "Adding..." : "Add Car"}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>

			<Transition appear show={isEditModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-20"
					onClose={() => setIsEditModalOpen(false)}
				>
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
									Edit Car
								</Dialog.Title>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Model Name
										</label>
										<input
											type="text"
											value={editFormData.model_name || ""}
											onChange={(e) =>
												setEditFormData((prev) => ({
													...prev,
													model_name: e.target.value,
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Daily Price
										</label>
										<input
											type="number"
											value={editFormData.daily_price || 0}
											onChange={(e) =>
												setEditFormData((prev) => ({
													...prev,
													daily_price: Number(e.target.value),
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Total Count
										</label>
										<input
											type="number"
											value={editFormData.total_count || 0}
											onChange={(e) =>
												setEditFormData((prev) => ({
													...prev,
													total_count: Number(e.target.value),
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-700">
											Available
										</label>
										<input
											type="number"
											value={editFormData.available || 0}
											onChange={(e) =>
												setEditFormData((prev) => ({
													...prev,
													available: Number(e.target.value),
												}))
											}
											className="border p-2 rounded w-full"
										/>
									</div>
									<div className="flex flex-col col-span-2">
										<label className="font-medium text-gray-700">
											Category
										</label>
										<select
											value={editFormData.category_id || ""}
											onChange={(e) =>
												setEditFormData((prev) => ({
													...prev,
													category_id: e.target.value,
												}))
											}
											className="border p-2 rounded w-full"
										>
											<option value="">Select Category</option>
											{categories?.map((cat) => (
												<option key={cat.id} value={cat.id}>
													{cat.name}
												</option>
											))}
										</select>
									</div>
									<div className="flex flex-col col-span-2">
										<label className="font-medium text-gray-700">
											Images (leave empty to keep existing)
										</label>
										<input
											type="file"
											multiple
											onChange={(e) => handleFileChange(e, true)}
											className="border p-2 rounded w-full"
										/>
									</div>
								</div>

								<div className="mt-4 flex justify-end gap-2">
									<button
										className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
										onClick={() => setIsEditModalOpen(false)}
									>
										Cancel
									</button>
									<button
										className="px-4 py-2 bg-gray-950 text-white rounded border border-gray-950 hover:bg-white hover:text-black transition"
										onClick={handleEditSubmit}
									>
										{updateMutation.isPending ? "Updating..." : "Update Car"}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>

			<div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-md mt-4">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100 rounded-t-xl">
						<tr>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Model
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Category
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Price
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								License
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Available
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{carsLoading ? (
							<tr>
								<td
									colSpan={6}
									className="py-6 text-center text-gray-500 italic"
								>
									Loading cars…
								</td>
							</tr>
						) : cars?.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="py-6 text-center text-gray-500 italic"
								>
									No cars available.
								</td>
							</tr>
						) : (
							cars?.map((car) => (
								<tr
									key={car.id}
									className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
								>
									<td className="py-3 px-4">{car.model_name}</td>
									<td className="py-3 px-4">
										{categories?.find((c) => c.id === car.category.id)?.name}
									</td>
									<td className="py-3 px-4">{car.daily_price} Birr</td>
									<td className="py-3 px-4">
										{car.images[0] ? (
											<button
												className="text-blue-700 underline hover:text-blue-900 transition"
												onClick={() => openImageModal(car.images[0].image!)}
											>
												View
											</button>
										) : (
											<span className="text-gray-500">None</span>
										)}
									</td>
									<td className="py-3 px-4">{car.available}</td>
									<td className="py-3 px-4 flex items-center gap-2">
										<button
											className="px-3 py-1 rounded bg-gray-950 text-white border border-gray-950 hover:bg-white hover:text-black transition"
											onClick={() => {
												setIsEditModalOpen(true);
												setEditingCarId(car.id);
												setEditFormData({
													category_id: car.category_id,
													model_name: car.model_name,
													daily_price: car.daily_price,
													total_count: car.total_count,
													available: car.available,
												});
											}}
										>
											Edit
										</button>

										<button
											className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
											onClick={() => handleDelete(car.id)}
										>
											Delete
										</button>

										<div className="relative">
											<select
												value={car.category_id || ""}
												onChange={(e) =>
													handleMoveCategory(car.id, e.target.value)
												}
												className="appearance-none border border-gray-300 rounded px-3 py-1 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
											>
												<option
													className="px-3 py-1 rounded bg-gray-950 text-white border border-gray-950 hover:bg-white hover:text-black transition"
													value=""
												>
													Move Category
												</option>
												{categories?.map((cat) => (
													<option
														className="px-3 py-1 rounded bg-gray-950 text-white border border-gray-950 hover:bg-white hover:text-black transition"
														key={cat.id}
														value={cat.id}
													>
														{cat.name}
													</option>
												))}
											</select>
											<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
												<svg
													className="fill-current h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
												>
													<path d="M5.516 7.548l4.484 4.482 4.484-4.482L15.5 8.484 10 13.984 4.5 8.484z" />
												</svg>
											</div>
										</div>
									</td>
								</tr>
							))
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
