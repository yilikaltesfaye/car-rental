// Payload & Response types
export interface SignupPayload {
	username: string;
	full_name: string;
	password: string;
	address?: string;
	phone?: string;
}

export interface LoginPayload {
	username: string;
	password: string;
}

export interface UpdateUserPayload {
	full_name?: string;
	address?: string;
	phone?: string;
	is_active?: boolean; // Admin only
	role?: string; // Admin only
}

export interface User {
	id: string;
	username: string;
	full_name: string;
	address: string;
	phone: string;
	is_active: boolean;
	is_superuser: boolean;
	role: string;
	created_at: string;
	updated_at: string;
}

export interface TokenResponse {
	message: string;
	access_token: string;
	user: User;
}

export interface RefreshResponse {
	access_token: string;
	user: User;
}

export interface LogoutResponse {
	message: string;
}
