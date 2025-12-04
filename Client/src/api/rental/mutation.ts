import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rentalApi } from "./api";
import type { CreateRentalPayload } from "../../types";

// USER — Create rental
export const useCreateRentalMutation = () => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateRentalPayload) =>
			rentalApi.createRental(data).then((res) => res.data),

		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["rentals", "me"] });
		},
	});
};

// ADMIN — Return rental
export const useReturnRentalMutation = () => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: string) =>
			rentalApi.returnRental(id).then((res) => res.data),

		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["rentals", "admin"] });
		},
	});
};
