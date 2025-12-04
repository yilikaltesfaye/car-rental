import { apiClient } from "../client";

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
	access: string;
	user: User;
}

export interface LogoutResponse {
	message: string;
}

export const authApi = {
	signup: (payload: SignupPayload) =>
		apiClient.post<TokenResponse>("/auth/signup", payload),
	login: (payload: LoginPayload) =>
		apiClient.post<TokenResponse>("/auth/login", payload),
	refreshToken: () => apiClient.post<RefreshResponse>("/auth/refresh-token"),
	logout: () => apiClient.post<LogoutResponse>("/auth/logout"),
};

export const userApi = {
	getMe: () => apiClient.get<User>("/auth/user/me"),
	updateMe: (payload: UpdateUserPayload) =>
		apiClient.patch<User>("/auth/user/me", payload),

	// ADMIN ONLY
	getUsers: () => apiClient.get<User[]>("/auth/user"),
	getUserById: (id: string) => apiClient.get<User>(`/auth/user/${id}`),
	updateUserById: (id: string, payload: UpdateUserPayload) =>
		apiClient.patch<User>(`/auth/user/${id}`, payload),
	deleteUserById: (id: string) =>
		apiClient.delete<{ message: string }>(`/auth/user/${id}`),
};
