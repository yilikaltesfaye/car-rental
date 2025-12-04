import { z } from "zod";

export const adminProfileSchema = z.object({
	full_name: z.string().min(1, "Full name is required"),
	address: z.string().min(1, "Address is required"),
	phone: z.string().min(1, "Phone number is required"),
});
export type AdminProfileForm = z.infer<typeof adminProfileSchema>;
