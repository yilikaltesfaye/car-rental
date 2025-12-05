import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { registerSchema, type RegisterInput } from "../../schema/auth.schema";

const Register = () => {
	const { register: authRegister } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterInput) => {
		try {
			await authRegister(data);
			navigate("/login");
		} catch (err) {
			console.error("Registration failed", err);
		}
	};

	return (
		<div className="flex h-screen w-full text-white font-inter">
			{/* Left Hero Image */}
			<div className="relative w-1/2 h-full hidden md:block bg-gray-800">
				<img
					src="/images/logup.jpg"
					alt="Welcome"
					loading="lazy"
					className="absolute w-full h-full object-cover transition-opacity duration-700 opacity-0"
					onLoad={(e) => (e.currentTarget.style.opacity = "1")}
				/>
				<div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-10">
					<h2 className="text-3xl font-bold uppercase">Welcome to Carent</h2>
					<p className="text-lg text-gray-300 mt-1">
						The best car rental platform
					</p>
				</div>
			</div>

			{/* Right Form */}
			<div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-20">
				<Link to="/">
					<h1 className="italic font-bold text-3xl mb-10 text-black">
						Carent.
					</h1>
				</Link>

				<h2 className="text-3xl font-bold mb-6 text-black">
					Create an Account
				</h2>

				<form
					className="flex flex-col gap-5 max-w-md"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col">
						<label className="font-semibold text-black mb-1">Username</label>
						<input
							{...register("username")}
							type="text"
							className="border border-gray-700 bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 text-black placeholder-gray-400"
							placeholder="Enter your username"
						/>
						{errors.username && (
							<p className="text-red-500 text-sm mt-1">
								{errors.username.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label className="font-semibold text-black mb-1">Full Name</label>
						<input
							{...register("full_name")}
							type="text"
							className="border border-gray-700 bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 text-black placeholder-gray-400"
							placeholder="Enter your full name"
						/>
						{errors.full_name && (
							<p className="text-red-500 text-sm mt-1">
								{errors.full_name.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label className="font-semibold text-black mb-1">Password</label>
						<input
							{...register("password")}
							type="password"
							className="border border-gray-700 bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 text-black placeholder-gray-400"
							placeholder="Enter a strong password"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label className="font-semibold text-black mb-1">Address</label>
						<input
							{...register("address")}
							type="text"
							className="border border-gray-700 bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 text-black placeholder-gray-400"
							placeholder="Enter your address"
						/>
						{errors.address && (
							<p className="text-red-500 text-sm mt-1">
								{errors.address.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label className="font-semibold text-black mb-1">Phone</label>
						<input
							{...register("phone")}
							type="tel"
							className="border border-gray-700 bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 text-black placeholder-gray-400"
							placeholder="Enter your phone number"
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm mt-1">
								{errors.phone.message}
							</p>
						)}
					</div>

					<button
						disabled={isSubmitting}
						type="submit"
						className="mt-4 bg-gray-950 hover:bg-white border border-gray-950 hover:text-black text-white py-3 rounded-lg font-bold transition-colors cursor-pointer"
					>
						Sign Up
					</button>
				</form>

				<p className="mt-6 text-gray-700">
					Already have an account?{" "}
					<Link to="/login" className="text-indigo-700 hover:underline">
						Login Here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
