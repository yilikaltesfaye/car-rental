import { Link } from "react-router";

const Register = () => {
	return (
		<div className="flex flex-row justify-evenly">
			<div>
				<h2>Welcome to Carent</h2>
				<p>the best car rental paltform</p>
			</div>
			<div>
				<Link to={"/"}>
					<h1 className="italic font-bold font-serif text-lg">Carent.</h1>
				</Link>
				<h2>Create An Account</h2>
				<form action="" className="flex flex-col">
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" />
					<label htmlFor="fullname">Full Name</label>
					<input type="text" name="fullname" id="fullname" />
					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address" />
					<label htmlFor="phone">Phone</label>
					<input type="tel" name="phone" id="phone" />
					<button type="submit">Sign up</button>
				</form>
				<p>
					Already have an account? <Link to={"/login"}>Login Here</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
