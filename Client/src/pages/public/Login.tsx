import { Link } from "react-router";

const Login = () => {
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

				<form className="flex flex-col gap-2 max-w-2xl">
					<div className="flex flex-col">
						<label htmlFor="username" className="font-semibold font-mono">
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="border p-2"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="font-semibold font-mono">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="border p-2"
						/>
					</div>
					<button type="submit" className="mt-4 bg-black text-white py-2 ">
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
