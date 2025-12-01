export default function UserProfile() {
	return (
		<div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold">My Profile</h2>

			{/* Profile Form */}
			<form className="flex flex-col gap-4">
				{/* Username (readonly) */}
				<div className="flex flex-col gap-1">
					<label className="text-gray-700 font-medium">Username</label>
					<input
						type="text"
						className="border border-gray-300 rounded-lg p-2 bg-gray-100"
						value="username_placeholder"
						readOnly
					/>
				</div>

				{/* Full Name */}
				<div className="flex flex-col gap-1">
					<label className="text-gray-700 font-medium">Full Name</label>
					<input
						type="text"
						className="border border-gray-300 rounded-lg p-2"
						placeholder="Enter full name"
					/>
				</div>

				{/* Address */}
				<div className="flex flex-col gap-1">
					<label className="text-gray-700 font-medium">Address</label>
					<input
						type="text"
						className="border border-gray-300 rounded-lg p-2"
						placeholder="Enter address"
					/>
				</div>

				{/* Phone */}
				<div className="flex flex-col gap-1">
					<label className="text-gray-700 font-medium">Phone Number</label>
					<input
						type="tel"
						className="border border-gray-300 rounded-lg p-2"
						placeholder="Enter phone number"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-48 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800"
				>
					Update Profile
				</button>
			</form>
		</div>
	);
}
