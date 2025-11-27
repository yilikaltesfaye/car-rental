import { Link } from "react-router";

const Login = () => {
	return (
		<div className="flex flex-row justify-evenly">
			<div>
				<h2>Welcome back to Carent</h2>
				<p>the best car rental paltform</p>
			</div>
			<div>
				<h1 className="italic font-bold font-serif text-lg">Carent.</h1>
				<h2>Log in to your account</h2>
				<form action="" className="flex flex-col">
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" />
					<button type="submit">Log In</button>
				</form>
				<p>
					Don't have an account? <Link to={"/register"}>Register Here</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
