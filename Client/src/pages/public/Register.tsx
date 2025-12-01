import { Link } from "react-router";

const Register = () => {
	return (
		<div className="flex h-screen w-full">
			{/* Left side image */}
			<div className="relative w-1/2 h-full">
				<img
					src="/images/logup.jpg"
					alt=""
					className="absolute  w-full h-full object-cover "
				/>
				<div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10 text-white">
					<h2 className="text-3xl font-semibold uppercase">
						Welcome to Carent
					</h2>
					<p className="text-lg ">The best car rental platform</p>
				</div>
			</div>

			{/* Right side form */}
			<div className="w-1/2 h-full flex flex-col justify-center px-20">
				<Link to="/">
					<h1 className="italic font-bold font-serif text-2xl mb-10">
						Carent.
					</h1>
				</Link>

				<h2 className="text-3xl font-bold mb-6">Create an Account</h2>

				<form className="flex flex-col gap-2 max-w-2xl">
					<div className="flex flex-col">
						<label className="font-semibold font-mono">Username</label>
						<input type="text" className="border p-2" />
					</div>

					<div className="flex flex-col">
						<label htmlFor="fullname" className="font-semibold font-mono">
							Full Name
						</label>
						<input
							type="text"
							name="fullname"
							id="fullname"
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

					<div className="flex flex-col">
						<label htmlFor="address" className="font-semibold font-mono">
							Address
						</label>
						<input
							type="text"
							name="address"
							id="address"
							className="border p-2"
						/>
					</div>

					<div className="flex flex-col">
						<label className="font-semibold font-mono " htmlFor="phone">
							Phone
						</label>
						<input type="tel" name="phone" id="phone" className="border p-2" />
					</div>

					<button type="submit" className="mt-4 bg-black text-white py-2 ">
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
