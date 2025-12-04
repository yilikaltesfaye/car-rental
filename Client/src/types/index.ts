export * from "./payload/account.payload";
export * from "./payload/catalog.payload";
export * from "./payload/adminpanel";

export enum Role {
	USER = "user",
	ADMIN = "admin",
}

export interface TokenResponse {
	access_token: string;
	user: User;
}

export interface RefreshResponse {
	access: string;
	user: User;
}

export interface LogoutResponse {
	message: string;
}

// User
export interface User {
	id: string;
	username: string;
	full_name: string;
	address: string;
	phone: string;
	is_active?: boolean;
	is_superuser?: boolean;
	created_at?: string;
	updated_at?: string;
	role: Role;
}
