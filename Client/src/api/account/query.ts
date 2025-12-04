import { useQuery } from "@tanstack/react-query";
import { userApi, type User } from "./api";

// Fetch current logged-in user
export const useUserFull = (enabled: boolean = true) =>
	useQuery<User>({
		queryKey: ["me"], // fixed query key formatting
		queryFn: async () => {
			const res = await userApi.getMe();
			return res.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: false,
		enabled,
	});

// Admin: fetch all users
export const useUsers = (enabled: boolean = true) =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await userApi.getUsers();
			return res.data;
		},
		enabled,
	});

// Admin: fetch single user by id
export const useUserById = (id: string, enabled: boolean = true) =>
	useQuery<User>({
		queryKey: ["user", id],
		queryFn: async () => {
			const res = await userApi.getUserById(id);
			return res.data;
		},
		enabled: !!id && enabled, // only enabled if id is provided
	});
