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
		<div className="flex h-screen w-full">
			<div className="relative w-1/2 h-full">
				<img
					src="/images/logup.jpg"
					alt=""
					className="absolute  w-full h-full object-cover "
				/>
				<div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10 text-white">
					<h2 className="text-3xl font-semibold uppercase">
						Welcome back to Carent
					</h2>
					<p className="text-lg ">The best car rental platform</p>
				</div>
			</div>
			<div className="w-1/2 h-full flex flex-col justify-center px-20">
				<Link to="/">
					<h1 className="italic font-bold font-serif text-2xl mb-10">
						Carent.
					</h1>
				</Link>

				<h2 className="text-3xl font-bold mb-6">Log in to your account</h2>

				<form
					className="flex flex-col gap-2 max-w-2xl"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col">
						<label htmlFor="username" className="font-semibold font-mono">
							Username
						</label>
						<input
							{...register("username")}
							type="text"
							name="username"
							id="username"
							className="border p-2"
						/>
						{errors.username && (
							<p className="text-red-600 text-sm mt-1">
								{errors.username.message}
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
							name="password"
							id="password"
							className="border p-2"
						/>
						{errors.password && (
							<p className="text-red-600 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						disabled={isSubmitting}
						type="submit"
						className="mt-4 bg-black text-white py-2 "
					>
						Log In
					</button>
				</form>
				<p className="mt-4">
					Don't have an account?{" "}
					<Link to={"/register"} className="underline">
						Register Here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
