import z from "zod";

export const loginSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
	phone: z
		.string()
		.min(10, "Phone number too short")
		.regex(/^\+2519\d{8}$/, "Phone must start with +2519 and be 12 digits"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	full_name: z.string().min(3, "Full name is required"),
	username: z.string().min(3),
	address: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
