import type {
	CarModel,
	CarModelCreatePayload,
	CarMovePayload,
	Category,
} from "../../types";
import { apiClient } from "../client";

export const categoryApi = {
	list: () => apiClient.get<Category[]>("/catalog/categories"),

	// ADMIN ONLY
	create: (payload: { name: string }) =>
		apiClient.post<Category>("/catalog/categories", payload),
	get: (id: string) => apiClient.get<Category>(`/catalog/categories/${id}`),
	update: (id: string, payload: { name: string }) =>
		apiClient.patch<Category>(`/catalog/categories/${id}`, payload),
	delete: (id: string) =>
		apiClient.delete<{ message: string }>(`/catalog/categories/${id}`),
};

export const carApi = {
	list: () => apiClient.get<CarModel[]>("/catalog/cars"),
	get: (id: string) => apiClient.get<CarModel>(`/catalog/cars/${id}`),

	// ADMIN ONLY
	create: (payload: CarModelCreatePayload) => {
		const formData = new FormData();
		formData.append("category_id", payload.category_id);
		formData.append("model_name", payload.model_name);
		formData.append("daily_price", payload.daily_price.toString());
		formData.append("total_count", payload.total_count.toString());
		if (payload.available !== undefined)
			formData.append("available", payload.available.toString());
		payload.images?.forEach((file) => formData.append("images", file));

		return apiClient.post<CarModel>("/catalog/cars/create", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},
	update: (id: string, payload: Partial<CarModelCreatePayload>) => {
		const formData = new FormData();
		if (payload.category_id)
			formData.append("category_id", payload.category_id);
		if (payload.model_name) formData.append("model_name", payload.model_name);
		if (payload.daily_price !== undefined)
			formData.append("daily_price", payload.daily_price.toString());
		if (payload.total_count !== undefined)
			formData.append("total_count", payload.total_count.toString());
		if (payload.available !== undefined)
			formData.append("available", payload.available.toString());
		payload.images?.forEach((file) => formData.append("images", file));

		return apiClient.patch<CarModel>(`/catalog/cars/${id}`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},
	delete: (id: string) =>
		apiClient.delete<{ message: string }>(`/catalog/cars/${id}`),
	move: (id: string, payload: CarMovePayload) =>
		apiClient.post<{ message: string; car: CarModel }>(
			`/catalog/cars/${id}/move`,
			payload
		),
};
