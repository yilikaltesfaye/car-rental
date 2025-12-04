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
			navigate("/login"); // redirect after successful signup
		} catch (err) {
			console.error("Registration failed", err);
		}
	};

	return (
		<div className="flex h-screen w-full">
			<div className="relative w-1/2 h-full">
				<img
					src="/images/logup.jpg"
					alt=""
					className="absolute w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10 text-white">
					<h2 className="text-3xl font-semibold uppercase">
						Welcome to Carent
					</h2>
					<p className="text-lg">The best car rental platform</p>
				</div>
			</div>

			<div className="w-1/2 h-full flex flex-col justify-center px-20">
				<Link to="/">
					<h1 className="italic font-bold font-serif text-2xl mb-10">
						Carent.
					</h1>
				</Link>

				<h2 className="text-3xl font-bold mb-6">Create an Account</h2>

				<form
					className="flex flex-col gap-2 max-w-2xl"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col">
						<label className="font-semibold font-mono">Username</label>
						<input
							{...register("username")}
							type="text"
							className="border p-2"
						/>
						{errors.username && (
							<p className="text-red-600 text-sm mt-1">
								{errors.username.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="full_name" className="font-semibold font-mono">
							Full Name
						</label>
						<input
							{...register("full_name")}
							type="text"
							id="full_name"
							className="border p-2"
						/>
						{errors.full_name && (
							<p className="text-red-600 text-sm mt-1">
								{errors.full_name.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="password" className="font-semibold font-mono">
							Password
						</label>
						<input
							{...register("password")}
							type="password"
							id="password"
							className="border p-2"
						/>
						{errors.password && (
							<p className="text-red-600 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="address" className="font-semibold font-mono">
							Address
						</label>
						<input
							{...register("address")}
							type="text"
							id="address"
							className="border p-2"
						/>
						{errors.address && (
							<p className="text-red-600 text-sm mt-1">
								{errors.address.message}
							</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="phone" className="font-semibold font-mono">
							Phone
						</label>
						<input
							{...register("phone")}
							type="tel"
							id="phone"
							className="border p-2"
						/>
						{errors.phone && (
							<p className="text-red-600 text-sm mt-1">
								{errors.phone.message}
							</p>
						)}
					</div>

					<button
						disabled={isSubmitting}
						type="submit"
						className="mt-4 bg-black text-white py-2"
					>
						Sign Up
					</button>
				</form>

				<p className="mt-4">
					Already have an account?{" "}
					<Link to="/login" className="underline">
						Login Here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
