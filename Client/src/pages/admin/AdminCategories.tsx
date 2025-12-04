import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useCategories } from "../../api/catalog/query";
import {
	useCreateCategory,
	useUpdateCategory,
	useDeleteCategory,
} from "../../api/catalog/mutation";

export default function AdminCategories() {
	const { data, isLoading } = useCategories();
	console.log(data);
	const createMutation = useCreateCategory();
	const updateMutation = useUpdateCategory();
	const deleteMutation = useDeleteCategory();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newName, setNewName] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingName, setEditingName] = useState("");
	const [editingDescription, setEditingDescription] = useState("");

	const handleAdd = async () => {
		if (!newName.trim()) return;
		await createMutation.mutateAsync({
			name: newName.trim(),
			description: newDescription.trim(),
		});
		setNewName("");
		setNewDescription("");
		setIsModalOpen(false);
	};

	const handleUpdate = async (id: string) => {
		if (!editingName.trim()) return;
		await updateMutation.mutateAsync({
			id,
			payload: {
				name: editingName.trim(),
				description: editingDescription.trim(),
			},
		});
		setEditingId(null);
	};

	const handleDelete = async (id: string) => {
		await deleteMutation.mutateAsync(id);
	};

	const isCreating = createMutation.status === "pending";
	const isUpdating = updateMutation.status === "pending";
	const isDeleting = deleteMutation.status === "pending";

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Categories Management</h2>

			<button
				className="self-end w-56 px-8 py-4 bg-blue-700 text-white rounded-lg font-medium shadow hover:bg-blue-800 "
				onClick={() => setIsModalOpen(true)}
			>
				Add New Category
			</button>

			{/* Modal */}
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsModalOpen(false)}
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
						<div className="fixed inset-0 bg-black bg-opacity-30" />
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
										Add New Category
									</Dialog.Title>

									<div className="flex flex-col gap-3">
										<input
											type="text"
											placeholder="Category Name"
											className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
											value={newName}
											onChange={(e) => setNewName(e.target.value)}
										/>
										<input
											type="text"
											placeholder="Description"
											className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
											value={newDescription}
											onChange={(e) => setNewDescription(e.target.value)}
										/>
									</div>

									<div className="mt-6 flex justify-end gap-3">
										<button
											type="button"
											className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
											onClick={() => setIsModalOpen(false)}
										>
											Cancel
										</button>
										<button
											type="button"
											className={`px-4 py-2 rounded-lg text-white font-medium ${
												isCreating
													? "bg-blue-400 cursor-not-allowed"
													: "bg-blue-700 hover:bg-blue-800"
											}`}
											onClick={handleAdd}
											disabled={isCreating}
										>
											{isCreating ? "Adding..." : "Add"}
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Categories Table */}
			<div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
								Category Name
							</th>
							<th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
								Description
							</th>
							<th className="py-3 px-6 text-center text-sm font-semibold text-gray-700">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{isLoading ? (
							<tr>
								<td
									colSpan={3}
									className="py-6 text-center text-gray-500 italic"
								>
									Loading categories...
								</td>
							</tr>
						) : data?.length === 0 ? (
							<tr>
								<td
									colSpan={3}
									className="py-6 text-center text-gray-500 italic"
								>
									No categories found.
								</td>
							</tr>
						) : (
							data?.map((cat) => (
								<tr
									key={cat.id}
									className={`transition-colors ${
										data?.indexOf(cat) % 2 === 0 ? "bg-white" : "bg-gray-50"
									} hover:bg-blue-50`}
								>
									<td className="py-3 px-6 text-gray-800">
										{editingId === cat.id ? (
											<input
												type="text"
												value={editingName}
												onChange={(e) => setEditingName(e.target.value)}
												className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
											/>
										) : (
											cat.name
										)}
									</td>
									<td className="py-3 px-6 text-gray-700">
										{editingId === cat.id ? (
											<input
												type="text"
												value={editingDescription}
												onChange={(e) => setEditingDescription(e.target.value)}
												className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
											/>
										) : (
											cat.description || "-"
										)}
									</td>
									<td className="py-3 px-6 flex justify-center gap-2">
										{editingId === cat.id ? (
											<>
												<button
													className={`px-4 py-2 rounded-lg text-white font-semibold shadow ${
														isUpdating
															? "bg-green-400 cursor-not-allowed"
															: "bg-green-500 hover:bg-green-600"
													}`}
													onClick={() => handleUpdate(cat.id)}
													disabled={isUpdating}
												>
													Save
												</button>
												<button
													className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 shadow"
													onClick={() => setEditingId(null)}
												>
													Cancel
												</button>
											</>
										) : (
											<>
												<button
													className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 shadow"
													onClick={() => {
														setEditingId(cat.id);
														setEditingName(cat.name);
														setEditingDescription(cat.description || "");
													}}
												>
													Edit
												</button>
												<button
													className={`px-4 py-2 rounded-lg text-white font-semibold shadow ${
														isDeleting
															? "bg-red-400 cursor-not-allowed"
															: "bg-red-600 hover:bg-red-700"
													}`}
													onClick={() => handleDelete(cat.id)}
													disabled={isDeleting}
												>
													Delete
												</button>
											</>
										)}
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
