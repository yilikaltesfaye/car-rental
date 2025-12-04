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
	console.log(categories);

	const createMutation = useCreateCar();
	const updateMutation = useUpdateCar();
	const deleteMutation = useDeleteCar();
	const moveMutation = useMoveCar();

	// Create Modal
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [createFormData, setCreateFormData] = useState<CarModelCreatePayload>({
		category_id: "",
		model_name: "",
		daily_price: 0,
		total_count: 0,
		available: 0,
		images: [],
	});

	// Edit Modal
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editFormData, setEditFormData] = useState<
		Partial<CarModelCreatePayload>
	>({});
	const [editingCarId, setEditingCarId] = useState<string | null>(null);

	// File handler
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

	// Create
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

	// Edit (partial update)
	const handleEditSubmit = async () => {
		if (!editingCarId) return;
		const payload: Partial<CarModelCreatePayload> = { ...editFormData };
		if (!editFormData.images?.length) delete payload.images; // keep old images if not updated
		await updateMutation.mutateAsync({ id: editingCarId, payload });
		setEditFormData({});
		setEditingCarId(null);
		setIsEditModalOpen(false);
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	// Delete
	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this car?")) return;
		await deleteMutation.mutateAsync(id);
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	// Move category
	const handleMoveCategory = async (id: string, category_id: string) => {
		await moveMutation.mutateAsync({ id, payload: { category_id } });
		queryClient.invalidateQueries({ queryKey: ["cars"] });
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Cars Management</h2>

			<button
				className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-32"
				onClick={() => setIsCreateModalOpen(true)}
			>
				Add New Car
			</button>

			{/* --- CREATE MODAL --- */}
			<Transition appear show={isCreateModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
										Add New Car
									</Dialog.Title>

									<div className="mt-4 grid grid-cols-2 gap-4">
										{/* Model */}
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
										{/* Daily Price */}
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
										{/* Total Count */}
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
										{/* Available */}
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
										{/* Category */}
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
										{/* Images */}
										<div className="flex flex-col col-span-2">
											<label className="font-medium text-gray-700">
												Images
											</label>
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
											className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
											onClick={() => setIsCreateModalOpen(false)}
										>
											Cancel
										</button>
										<button
											className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
											onClick={handleCreateSubmit}
											disabled={createMutation.isPending}
										>
											{createMutation.isPending ? "Adding..." : "Add Car"}
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* --- EDIT MODAL --- */}
			<Transition appear show={isEditModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
										Edit Car
									</Dialog.Title>

									<div className="mt-4 grid grid-cols-2 gap-4">
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
												onChange={(e) => {
													const selectedUuid = e.target.value;

													// You do NOT need to look up the full category object here
													// because the select value is ALREADY the ID.

													setEditFormData((prev) => ({
														...prev,
														category_id: selectedUuid, // selectedUuid is the cat.id
													}));
												}}
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
											className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
											onClick={() => setIsEditModalOpen(false)}
										>
											Cancel
										</button>
										<button
											className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
											onClick={handleEditSubmit}
											disabled={updateMutation.isPending}
										>
											{updateMutation.isPending ? "Updating..." : "Update Car"}
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* --- CARS TABLE --- */}
			<div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100">
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
									colSpan={5}
									className="py-6 text-center text-gray-500 italic"
								>
									Loading cars...
								</td>
							</tr>
						) : cars?.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="py-6 text-center text-gray-500 italic"
								>
									No cars found.
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
									<td className="py-3 px-4">{car.available}</td>
									<td className="py-3 px-4 flex gap-2">
										<button
											className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
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
											className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
											onClick={() => handleDelete(car.id)}
										>
											Delete
										</button>
										<select
											value={car.category_id}
											className="border rounded px-2 py-1"
											onChange={(e) =>
												handleMoveCategory(car.id, e.target.value)
											}
										>
											<option value="">Move Category</option>
											{categories?.map((cat) => (
												<option key={cat.id} value={cat.id}>
													{cat.name}
												</option>
											))}
										</select>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
