import { useQuery } from "@tanstack/react-query";
import { rentalApi } from "./api";
import type { AdminFilters } from "../../types";

// USER — Get my rentals
export const useMyRentalsQuery = () =>
	useQuery({
		queryKey: ["rentals", "me"],
		queryFn: () => rentalApi.getMyRentals().then((res) => res.data),
	});

// ADMIN — Get all rentals
export const useAdminRentalsQuery = (filters?: AdminFilters) =>
	useQuery({
		queryKey: ["rentals", "admin", filters],
		queryFn: () => rentalApi.getAllRentals(filters).then((res) => res.data),
	});
