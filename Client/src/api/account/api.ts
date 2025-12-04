import type {
	SignupPayload,
	TokenResponse,
	LoginPayload,
	RefreshResponse,
	LogoutResponse,
	User,
	UpdateUserPayload,
} from "../../types";
import { apiClient } from "../client";

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
