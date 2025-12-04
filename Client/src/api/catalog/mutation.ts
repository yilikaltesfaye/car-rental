import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { CarModel, CarModelCreatePayload, Category } from "../../types";
// Assuming this is imported but now redundant: import { queryClient } from "../../api";
import { carApi, categoryApi } from "./api";

// --- Category Mutations (FIXED in previous turn) ---

export const useCreateCategory = () => {
	const queryClient = useQueryClient(); // Correctly using the hook
	return useMutation({
		mutationFn: (payload: { name: string; description: string }) =>
			categoryApi
				.create(payload)
				.then((res: AxiosResponse<Category>) => res.data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["categories"] }),
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient(); // Correctly using the hook
	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: { name: string; description: string };
		}) =>
			categoryApi
				.update(id, payload)
				.then((res: AxiosResponse<Category>) => res.data),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient(); // Correctly using the hook
	return useMutation({
		mutationFn: (id: string) =>
			categoryApi
				.delete(id)
				.then((res: AxiosResponse<{ message: string }>) => res.data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["categories"] }),
	});
};

// --- Car Mutations (ALL FIXED) ---

export const useCreateCar = () => {
	const queryClient = useQueryClient(); // ✅ Corrected: Was missing in the previous turn

	return useMutation<CarModel, unknown, CarModelCreatePayload>({
		mutationFn: (payload) => carApi.create(payload).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cars"] });
		},
	});
};

export const useUpdateCar = () => {
	const queryClient = useQueryClient(); // ✅ Corrected: Was missing in the previous turn
	return useMutation<
		CarModel,
		unknown,
		{ id: string; payload: Partial<CarModelCreatePayload> }
	>({
		mutationFn: ({ id, payload }) =>
			carApi.update(id, payload).then((res) => res.data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cars"] });
			queryClient.invalidateQueries({ queryKey: ["car", variables.id] });
		},
	});
};

export const useDeleteCar = () => {
	const queryClient = useQueryClient(); // ✅ Corrected: Was missing in the previous turn

	return useMutation({
		mutationFn: (id: string) => carApi.delete(id).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cars"] });
		},
	});
};

export const useMoveCar = () => {
	const queryClient = useQueryClient(); // ✅ Corrected: Was missing in the previous turn
	return useMutation<
		{ message: string; car: CarModel },
		unknown,
		{ id: string; payload: { category_id: string } }
	>({
		mutationFn: ({ id, payload }) =>
			carApi.move(id, payload).then((res) => res.data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cars"] });
			queryClient.invalidateQueries({ queryKey: ["car", variables.id] });
		},
	});
};
