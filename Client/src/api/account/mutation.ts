import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, userApi } from "./api";
import type {
	SignupPayload,
	LoginPayload,
	UpdateUserPayload,
} from "../../types";

// ---------------------
// Auth Mutations
// ---------------------

export const useSignup = () => {
	return useMutation({
		mutationFn: async (payload: SignupPayload) => {
			const res = await authApi.signup(payload);
			return res.data;
		},
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: async (payload: LoginPayload) => {
			const res = await authApi.login(payload);
			return res.data;
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const res = await authApi.logout();
			return res.data;
		},
		onSuccess: () => {
			queryClient.clear(); // clear queries on logout
		},
	});
};

export const useRefreshToken = () => {
	return useMutation({
		mutationFn: async () => {
			const res = await authApi.refreshToken();
			return res.data;
		},
	});
};

// ---------------------
// User Mutations
// ---------------------

export const useUpdateMe = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: UpdateUserPayload) => {
			const res = await userApi.updateMe(payload);
			return res.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["me"], data); // update cached me
		},
	});
};

// ADMIN ONLY
export const useDeleteUserById = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const res = await userApi.deleteUserById(id);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUpdateUserById = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: UpdateUserPayload) => {
			const res = await userApi.updateUserById(id, payload);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user", id] });
		},
	});
};
