// hooks/useAdminRentalSummary.ts
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "./api";
import type { RentalSummaryQuery, RentalSummary } from "../../types";

export const useAdminRentalSummary = (query?: RentalSummaryQuery) => {
	return useQuery<RentalSummary[], Error>({
		queryKey: ["adminRentalSummary", query],
		queryFn: () => adminApi.getRentalSummary(query).then((res) => res.data),

		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchOnWindowFocus: false,
	});
};
