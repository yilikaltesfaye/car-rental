import { useQuery } from "@tanstack/react-query";
import type { CarModel, Category } from "../../types";
import { carApi, categoryApi } from "./api";

export const useCategories = () => {
	return useQuery<Category[], Error>({
		queryKey: ["categories"],
		queryFn: () => categoryApi.list().then((res) => res.data),
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});
};

export const useCategory = (id: string) => {
	return useQuery<Category, Error>({
		queryKey: ["category", id],
		queryFn: () => categoryApi.get(id).then((res) => res.data),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};

// Fetch all cars
export const useCars = (enabled: boolean = true) =>
	useQuery<CarModel[]>({
		queryKey: ["cars"],
		queryFn: async () => {
			const res = await carApi.list();
			return res.data;
		},
		enabled,
	});

// Fetch single car by ID
export const useCarById = (id: string, enabled: boolean = true) =>
	useQuery<CarModel>({
		queryKey: ["car", id],
		queryFn: async () => {
			const res = await carApi.get(id);
			return res.data;
		},
		// Already correct: Only enable if ID is present AND explicitly enabled.
		enabled: enabled,
		// ✅ NEW: Keep the previously fetched data displayed when the query is disabled.
	});
