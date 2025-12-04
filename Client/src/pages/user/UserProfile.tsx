import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { useUpdateMe } from "../../api";
import { useEffect, useState } from "react";
import {
	type AdminProfileForm,
	adminProfileSchema,
} from "../../schema/admin.schema";

export default function UserProfile() {
	const { user, setUser } = useAuth();
	const updateMutation = useUpdateMe();

	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<AdminProfileForm>({
		resolver: zodResolver(adminProfileSchema),
		defaultValues: {
			full_name: user?.full_name || "",
			address: user?.address || "",
			phone: user?.phone || "",
		},
	});

	useEffect(() => {
		reset({
			full_name: user?.full_name || "",
			address: user?.address || "",
			phone: user?.phone || "",
		});
	}, [user, reset]);

	useEffect(() => {
		if (!message) return;
		const timer = setTimeout(() => setMessage(null), 3000);
		return () => clearTimeout(timer);
	}, [message]);

	const onSubmit = async (data: AdminProfileForm) => {
		try {
			const res = await updateMutation.mutateAsync(data);
			setUser(res);
			setMessage({ type: "success", text: "Profile updated successfully!" });
		} catch {
			setMessage({
				type: "error",
				text: "Failed to update profile. Please try again.",
			});
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">My Profile</h2>

			<div className="">
				{/* Message Banner */}
				{message && (
					<div
						className={`mb-4 flex justify-between items-center p-3 rounded-md text-white font-medium transition-all ${
							message.type === "success" ? "bg-green-500" : "bg-red-500"
						}`}
					>
						<span>{message.text}</span>
						<button
							type="button"
							onClick={() => setMessage(null)}
							className="ml-4 text-white font-bold hover:text-gray-200 transition"
						>
							&times;
						</button>
					</div>
				)}

				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
					{/* Username */}
					<div className="flex flex-col gap-1">
						<label className="text-gray-600 font-semibold">Username</label>
						<input
							type="text"
							className="border border-gray-300 rounded-lg p-2 bg-gray-100"
							value={user?.username}
							readOnly
						/>
					</div>

					{/* Full Name */}
					<div className="flex flex-col gap-1">
						<label className="text-gray-600 font-semibold">Full Name</label>
						<input
							type="text"
							className={`border p-3 rounded-lg focus:ring-2 outline-none transition ${
								errors.full_name
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-blue-400"
							}`}
							{...register("full_name")}
						/>
						{errors.full_name && (
							<p className="text-red-500 text-sm mt-1">
								{errors.full_name.message}
							</p>
						)}
					</div>

					{/* Address */}
					<div className="flex flex-col gap-1">
						<label className="text-gray-600 font-semibold">Address</label>
						<input
							type="text"
							className={`border p-3 rounded-lg focus:ring-2 outline-none transition ${
								errors.address
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-blue-400"
							}`}
							{...register("address")}
						/>
						{errors.address && (
							<p className="text-red-500 text-blg mt-1">
								{errors.address.message}
							</p>
						)}
					</div>

					{/* Phone */}
					<div className="flex flex-col gap-1">
						<label className="text-gray-600 font-semibold">Phone Number</label>
						<input
							type="tel"
							className={`border p-3 rounded-lg focus:ring-2 outline-none transition ${
								errors.phone
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-blue-400"
							}`}
							{...register("phone")}
						/>
						{errors.phone && (
							<p className="text-red-500 text-lg mt-1">
								{errors.phone.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-4 w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Updating..." : "Update Profile"}
					</button>
				</form>
			</div>
		</div>
	);
}
