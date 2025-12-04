export type RentalStatus = "rented" | "returned";

export interface RentalSummaryRental {
	rental_id: string;
	car_model: string;
	start_date: string; // ISO string
	end_date: string; // ISO string
	status: RentalStatus;
}

export interface RentalSummary {
	user_id: string;
	username: string;
	full_name: string;
	total_rentals: number;
	rentals: RentalSummaryRental[];
}

export interface RentalSummaryQuery {
	user_id?: string;
	status?: RentalStatus;
	start_date?: string; // YYYY-MM-DD
	end_date?: string; // YYYY-MM-DD
}
