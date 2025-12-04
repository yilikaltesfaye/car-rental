import type { RentalSummary, RentalSummaryQuery } from "../../types";
import { apiClient } from "../client";

export const adminApi = {
	getRentalSummary: (query?: RentalSummaryQuery) =>
		apiClient.get<RentalSummary[]>("/adminpanel/summary", { params: query }),
};
