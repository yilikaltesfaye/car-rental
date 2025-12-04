export interface Category {
	id: string;
	name: string;
}

export interface CarImage {
	id: string;
	image: string; // URL
}

export interface CarModel {
	id: string;
	category: string; // category name
	category_id: string; // for creating/updating
	model_name: string;
	daily_price: number;
	total_count: number;
	available: number;
	images: CarImage[];
}

export interface CarModelCreatePayload {
	category_id: string;
	model_name: string;
	daily_price: number;
	total_count: number;
	available?: number;
	images?: File[];
}

export interface CarMovePayload {
	category_id: string;
}
