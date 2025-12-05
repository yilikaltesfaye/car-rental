import type { User } from "./account.payload";
import type { RentalStatus } from "./adminpanel";
import type { CarModel } from "./catalog.payload";

// RENTAL
export interface Rental {
	id: string;
	user: User["username"]; // Admin serializer returns string username
	car: CarModel;
	start_date: string;
	end_date: string;
	license_image: string | null;
	status: RentalStatus;
	created_at: string;
}

// CREATE RENTAL PAYLOAD (USER)
export interface CreateRentalPayload {
	car_id: string;
	start_date: string;
	end_date: string;
	license_image?: File | null;
}

// ADMIN FILTERS
export interface AdminFilters {
	user_id?: string;
	status?: RentalStatus;
	start_date?: string;
	end_date?: string;
}
