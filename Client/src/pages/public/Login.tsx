import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginInput, loginSchema } from "../../schema/auth.schema";

const Login = () => {
	const { user, login } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || "/admin";

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	});

	useEffect(() => {
		if (user && location.state?.from?.pathname !== "redirected") {
			navigate(from, { replace: true, state: { from: "redirected" } });
		}
	}, [from, location.state?.from?.pathname, navigate, user]);

	const onSubmit = async (data: LoginInput) => {
		try {
			await login({
				username: data.username,
				password: data.password,
			});
		} catch (err) {
			console.log("Login failed", err);
		}
	};

	return (
		<div className="flex h-screen w-full  text-white font-inter">
			<div className="relative w-1/2 h-full hidden md:block bg-gray-800">
				<img
					src="/images/logup.jpg"
					alt="Welcome"
					loading="lazy"
					className="absolute w-full h-full object-cover transition-opacity duration-700 opacity-0"
					onLoad={(e) => (e.currentTarget.style.opacity = "1")}
				/>
				<div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-10">
					<h2 className="text-3xl font-bold uppercase">
						Welcome Back to Carent
					</h2>
					<p className="text-lg text-gray-300 mt-1">
						The best car rental platform
					</p>
				</div>
			</div>

			<div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-20 ">
				<Link to="/">
					<h1 className="italic font-bold text-3xl mb-10 text-black">
						Carent.
					</h1>
				</Link>

				<h2 className="text-3xl font-bold mb-6 text-black">
					Log in to your account
				</h2>

				<form
					className="flex flex-col gap-5 max-w-md"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col">
						<label htmlFor="username" className="font-semibold text-black mb-1">
							Username
						</label>
						<input
							{...register("username")}
							type="text"
							id="username"
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
						<label htmlFor="password" className="font-semibold text-black mb-1">
							Password
						</label>
						<input
							{...register("password")}
							type="password"
							id="password"
							className="border border-gray-700 bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 text-black placeholder-gray-400"
							placeholder="Enter your password"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<button
						disabled={isSubmitting}
						type="submit"
						className="mt-4 bg-gray-950 hover:bg-white border border-gray-950 hover:text-black text-white py-3 rounded-lg font-bold transition-colors cursor-pointer"
					>
						Log In
					</button>
				</form>

				<p className="mt-6 text-gray-700">
					Don't have an account?{" "}
					<Link to="/register" className="text-indigo-700 hover:underline">
						Register Here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
