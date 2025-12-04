export interface UpdateUserPayload {
	username?: string;
	full_name?: string;
	address?: string;
	phone?: string;
	// ADMIN ONLY
	role?: "user" | "admin";
	is_active?: boolean;
}

export interface SignupPayload {
	username: string;
	full_name: string;
	password: string;
	address: string;
	phone: string;
}

export interface LoginPayload {
	username: string;
	password: string;
}
