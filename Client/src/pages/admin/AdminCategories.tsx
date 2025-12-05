import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCategories } from "../../api/catalog/query";
import {
	useCreateCategory,
	useUpdateCategory,
	useDeleteCategory,
} from "../../api/catalog/mutation";

export default function AdminCategories() {
	const { data: categories, isLoading } = useCategories();
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
		if (!confirm("Are you sure you want to delete this category?")) return;
		await deleteMutation.mutateAsync(id);
	};

	const isCreating = createMutation.isPending;
	const isUpdating = updateMutation.isPending;
	const isDeleting = deleteMutation.isPending;

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold text-gray-950">
				Categories Management
			</h2>

			<button
				className="self-end px-6 py-3 bg-gray-950 text-white rounded-lg border border-gray-950 font-medium shadow hover:bg-white hover:text-black transition"
				onClick={() => setIsModalOpen(true)}
			>
				Add New Category
			</button>

			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50"
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
							<Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
								<Dialog.Title className="text-lg font-medium mb-4 text-gray-950">
									Add New Category
								</Dialog.Title>

								<div className="flex flex-col gap-3">
									<input
										type="text"
										placeholder="Category Name"
										className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-950"
										value={newName}
										onChange={(e) => setNewName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="Description"
										className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-950"
										value={newDescription}
										onChange={(e) => setNewDescription(e.target.value)}
									/>
								</div>

								<div className="mt-6 flex justify-end gap-3">
									<button
										type="button"
										className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
										onClick={() => setIsModalOpen(false)}
									>
										Cancel
									</button>
									<button
										type="button"
										className={`px-4 py-2 rounded-lg font-medium text-white ${
											isCreating
												? "bg-gray-400 cursor-not-allowed"
												: "bg-gray-950 hover:bg-white hover:text-black border border-gray-950 transition"
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
				</Dialog>
			</Transition>

			<div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-md">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Name
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Description
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
									colSpan={3}
									className="py-6 text-center text-gray-500 italic"
								>
									Loading categories...
								</td>
							</tr>
						) : categories?.length === 0 ? (
							<tr>
								<td
									colSpan={3}
									className="py-6 text-center text-gray-500 italic"
								>
									No categories found.
								</td>
							</tr>
						) : (
							categories?.map((cat) => (
								<tr
									key={cat.id}
									className={`transition-colors ${
										categories.indexOf(cat) % 2 === 0
											? "bg-white"
											: "bg-gray-50"
									} hover:bg-gray-100`}
								>
									<td className="py-3 px-4 text-gray-950">
										{editingId === cat.id ? (
											<input
												type="text"
												value={editingName}
												onChange={(e) => setEditingName(e.target.value)}
												className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
											/>
										) : (
											cat.name
										)}
									</td>
									<td className="py-3 px-4 text-gray-700">
										{editingId === cat.id ? (
											<input
												type="text"
												value={editingDescription}
												onChange={(e) => setEditingDescription(e.target.value)}
												className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
											/>
										) : (
											cat.description || "-"
										)}
									</td>
									<td className="py-3 px-4 flex gap-2">
										{editingId === cat.id ? (
											<>
												<button
													className={`px-4 py-2 rounded font-medium text-white ${
														isUpdating
															? "bg-green-400 cursor-not-allowed"
															: "bg-green-600 hover:bg-green-700"
													}`}
													onClick={() => handleUpdate(cat.id)}
													disabled={isUpdating}
												>
													Save
												</button>
												<button
													className="px-4 py-2 rounded bg-gray-300 text-white hover:bg-gray-400"
													onClick={() => setEditingId(null)}
												>
													Cancel
												</button>
											</>
										) : (
											<>
												<button
													className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
													onClick={() => {
														setEditingId(cat.id);
														setEditingName(cat.name);
														setEditingDescription(cat.description || "");
													}}
												>
													Edit
												</button>
												<button
													className={`px-4 py-2 rounded font-medium text-white ${
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
