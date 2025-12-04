import { useQuery } from "@tanstack/react-query";
import { userApi } from "./api";
import type { User } from "../../types";

// Fetch current logged-in user
export const useMe = () =>
	useQuery<User>({
		queryKey: ["me"],
		queryFn: async () => {
			const res = await userApi.getMe();
			return res.data;
		},
		staleTime: 60_000,
		retry: 1,
		refetchOnWindowFocus: false,
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
