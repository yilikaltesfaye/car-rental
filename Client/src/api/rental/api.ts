// import type { Rental, CreateRentalPayload, AdminFilters } from "../../types";
import type { Rental, CreateRentalPayload, AdminFilters } from "../../types";
import { apiClient } from "../client";

export const rentalApi = {
	// USER
	getMyRentals: () => apiClient.get<Rental[]>("/rental/me"),

	createRental: (payload: CreateRentalPayload) => {
		const form = new FormData();
		form.append("car_id", payload.car_id);
		form.append("start_date", payload.start_date);
		form.append("end_date", payload.end_date);

		if (payload.license_image) {
			form.append("license_image", payload.license_image);
		}

		return apiClient.post<Rental>("/rental/me", form, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},

	// ADMIN
	getAllRentals: (filters?: AdminFilters) =>
		apiClient.get<Rental[]>("/rental", { params: filters }),

	returnRental: (id: string) => apiClient.patch<Rental>(`/rental/${id}/return`),
};
