import { useMutation } from "@tanstack/react-query";
import { authApi, userApi } from "./api";
import type {
	SignupPayload,
	LoginPayload,
	UpdateUserPayload,
} from "../../types";
import { queryClient } from "../client";

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
			console.log("Logged in user role:", res.data.user.role);
			return res.data;
		},
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: async () => {
			const res = await authApi.logout();
			return res.data;
		},
		onSuccess: () => {
			queryClient.clear(); // clear all cached queries on logout
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
	return useMutation({
		mutationFn: async (payload: UpdateUserPayload) => {
			const res = await userApi.updateMe(payload);
			return res.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["me"], data); // update cached "me" data
		},
	});
};

// ADMIN ONLY
export const useDeleteUserById = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const res = await userApi.deleteUserById(id);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] }); // refresh users list
		},
	});
};

export const useUpdateUserById = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: UpdateUserPayload;
		}) => {
			const res = await userApi.updateUserById(id, payload);
			return res.data;
		},
		onSuccess: (_, variables) => {
			const id = variables.id;
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user", id] });
		},
	});
};
