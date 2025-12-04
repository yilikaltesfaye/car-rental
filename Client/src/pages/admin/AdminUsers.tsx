import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUsers, useDeleteUserById, useUpdateUserById } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { UpdateUserPayload } from "../../types";

interface User {
	id: string;
	username: string;
	full_name: string;
	address: string;
	phone: string;
	role: string;
	is_active: boolean;
}

// Validation schema for modal form
const updateUserSchema = z.object({
	full_name: z.string().min(2, "Full name is required"),
	address: z.string().min(2, "Address is required"),
	phone: z.string().min(6, "Phone is required"),
	role: z.enum(["user", "admin"]),
	is_active: z.boolean(),
});

type UpdateUserForm = z.infer<typeof updateUserSchema>;

export default function AdminUsers() {
	const { user: ownUser } = useAuth();
	const { data: users = [], isLoading } = useUsers();
	const deleteMutation = useDeleteUserById();
	const updateMutation = useUpdateUserById();

	const [processingId, setProcessingId] = useState<string | null>(null);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this user?")) return;
		setProcessingId(id);
		await deleteMutation.mutateAsync(id);
		setProcessingId(null);
	};

	const handleToggleActive = async (id: string, isActive: boolean) => {
		setProcessingId(id);
		await updateMutation.mutateAsync({ id, payload: { is_active: !isActive } });
		setProcessingId(null);
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">Users Management</h2>

			<div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Username
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Full Name
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Phone
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Address
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Role
							</th>
							<th className="py-3 px-4 text-left font-medium text-gray-700">
								Status
							</th>
							<th className="py-3 px-4 font-medium text-gray-700">Actions</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td
									colSpan={7}
									className="py-6 text-center text-gray-500 italic"
								>
									Loading users...
								</td>
							</tr>
						) : users.length === 0 ? (
							<tr>
								<td
									colSpan={7}
									className="py-6 text-center text-gray-500 italic"
								>
									No users found.
								</td>
							</tr>
						) : (
							users.map((user) => (
								<tr
									key={user.id}
									className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
								>
									<td className="py-3 px-4">{user.username}</td>
									<td className="py-3 px-4">{user.full_name}</td>
									<td className="py-3 px-4">{user.phone}</td>
									<td className="py-3 px-4">{user.address}</td>
									<td className="py-3 px-4">{user.role}</td>
									<td className="py-3 px-4">
										<span
											className={`px-2 py-1 rounded text-white font-medium ${
												user.is_active ? "bg-green-500" : "bg-gray-500"
											}`}
										>
											{user.is_active ? "Active" : "Inactive"}
										</span>
									</td>
									<td className="py-3 px-4 flex gap-2">
										{ownUser?.id !== user.id && (
											<>
												<button
													className={`px-3 py-1 rounded text-white font-medium ${
														user.is_active
															? "bg-gray-400 hover:bg-gray-500"
															: "bg-blue-600 hover:bg-blue-700"
													}`}
													onClick={() =>
														handleToggleActive(user.id, user.is_active)
													}
													disabled={processingId === user.id}
												>
													{processingId === user.id
														? "Processing..."
														: user.is_active
														? "Deactivate"
														: "Activate"}
												</button>
												<button
													className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
													onClick={() => setEditingUser(user)}
												>
													Edit
												</button>
												<button
													className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
													onClick={() => handleDelete(user.id)}
													disabled={processingId === user.id}
												>
													{processingId === user.id ? "Deleting..." : "Delete"}
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

			{/* Update User Modal */}
			{editingUser && (
				<Transition appear show={!!editingUser} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-50"
						onClose={() => setEditingUser(null)}
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
								<Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
									<Dialog.Title className="text-xl font-semibold mb-4">
										Update User
									</Dialog.Title>
									<UpdateUserForm
										user={editingUser}
										onClose={() => setEditingUser(null)}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			)}
		</div>
	);
}

function UpdateUserForm({
	user,
	onClose,
}: {
	user: User;
	onClose: () => void;
}) {
	const updateMutation = useUpdateUserById();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UpdateUserForm>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			full_name: user.full_name,
			address: user.address,
			phone: user.phone,
			role: user.role as "user" | "admin",
			is_active: user.is_active,
		},
	});

	const onSubmit = async (data: UpdateUserPayload) => {
		try {
			await updateMutation.mutateAsync({ id: user.id, payload: data });
			onClose();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				placeholder="Full Name"
				{...register("full_name")}
				className={`border p-2 rounded ${
					errors.full_name ? "border-red-500" : "border-gray-300"
				}`}
			/>
			{errors.full_name && (
				<span className="text-red-500 text-sm">{errors.full_name.message}</span>
			)}

			<input
				type="text"
				placeholder="Address"
				{...register("address")}
				className={`border p-2 rounded ${
					errors.address ? "border-red-500" : "border-gray-300"
				}`}
			/>
			{errors.address && (
				<span className="text-red-500 text-sm">{errors.address.message}</span>
			)}

			<input
				type="tel"
				placeholder="Phone"
				{...register("phone")}
				className={`border p-2 rounded ${
					errors.phone ? "border-red-500" : "border-gray-300"
				}`}
			/>
			{errors.phone && (
				<span className="text-red-500 text-sm">{errors.phone.message}</span>
			)}

			<select {...register("role")} className="border p-2 rounded">
				<option value="user">User</option>
				<option value="admin">Admin</option>
			</select>

			<label className="flex items-center gap-2">
				<input type="checkbox" {...register("is_active")} />
				Active
			</label>

			<div className="flex justify-end gap-2 mt-3">
				<button
					type="button"
					className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
					onClick={onClose}
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Updating..." : "Update"}
				</button>
			</div>
		</form>
	);
}
