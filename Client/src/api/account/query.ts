import { useQuery } from "@tanstack/react-query";
import { userApi } from "./api";
import type { User } from "../../types";

// Fetch current logged-in user
export const useUserFull = (enabled: boolean = true) =>
	useQuery<User>({
		queryKey: ["useUserFull "],
		queryFn: async () => {
			const res = await userApi.getMe();
			return res.data;
		},
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled,
	});

// Admin: fetch all users
export const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await userApi.getUsers();
			return res.data;
		},
	});

// Admin: fetch single user by id
export const useUserById = (id: string) =>
	useQuery<User>({
		queryKey: ["user", id],
		queryFn: async () => {
			const res = await userApi.getUserById(id);
			return res.data;
		},
		enabled: !!id,
	});
