import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/account/api";
import { setAccessToken } from "../api";
import type { User, LoginPayload, SignupPayload } from "../types";

type Role = "user" | "admin";

type AuthContextType = {
	user: User | null;
	role?: Role;
	isLoading: boolean;
	login: (payload: LoginPayload) => Promise<void>;
	register: (payload: SignupPayload) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isInitializing, setIsInitializing] = useState(true);

	// Initialize auth on mount
	useEffect(() => {
		const init = async () => {
			try {
				const res = await authApi.refreshToken();
				setAccessToken(res.data.access);
				setUser(res.data.user as User);
			} catch {
				setUser(null);
				setAccessToken(null);
			} finally {
				setIsInitializing(false);
			}
		};
		init();
	}, []);

	// Optional auto-refresh token every 15 min
	useEffect(() => {
		if (!user) return;
		const interval = setInterval(async () => {
			try {
				const res = await authApi.refreshToken();
				setAccessToken(res.data.access);
				setUser(res.data.user as User);
			} catch {
				setUser(null);
				setAccessToken(null);
			}
		}, 15 * 60 * 1000);
		return () => clearInterval(interval);
	}, [user]);

	const login = async (payload: LoginPayload) => {
		const res = await authApi.login(payload);
		setAccessToken(res.data.access_token);
		setUser(res.data.user as User);
	};

	const register = async (payload: SignupPayload) => {
		const res = await authApi.signup(payload);
		setAccessToken(res.data.access_token);
		setUser(res.data.user as User);
	};

	const logout = async () => {
		await authApi.logout();
		setUser(null);
		setAccessToken(null);
	};

	// Delay rendering children until initialization completes
	if (isInitializing) return <div>Loading...</div>;

	return (
		<AuthContext.Provider
			value={{
				user,
				role: user?.role as Role,
				isLoading: isInitializing,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
