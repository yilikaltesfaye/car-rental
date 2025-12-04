import React, { createContext, useContext, useEffect, useState } from "react";
import type { LoginPayload, Role, SignupPayload, User } from "../types";
import {
	useUserFull,
	useLogin,
	useSignup,
	useLogout,
	setAccessToken,
} from "../api";
import { authApi } from "../api/account/api";

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
	const [accessToken, internalSetAccessToken] = useState<string | null>(null);
	const [isInitializing, setIsInitializing] = useState(true);

	const meQuery = useUserFull(!!accessToken);
	const loginM = useLogin();
	const registerM = useSignup();
	const logoutM = useLogout();

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const res = await authApi.refreshToken();
				internalSetAccessToken(res.data.access as string);
				setAccessToken(res.data.access as string);
				await meQuery.refetch();
			} catch (error: unknown) {
				const err = error as { response?: { status?: number } };
				if (err.response?.status === 401) {
					setUser(null);
					internalSetAccessToken(null);
					setAccessToken(null);
				} else {
					console.error("Unexpected error during token refresh", error);
				}
			} finally {
				setIsInitializing(false);
			}
		};
		initializeAuth();
	}, [meQuery]);

	useEffect(() => {
		if (meQuery.isSuccess && meQuery.data) {
			setUser(meQuery.data);
		} else if (meQuery.isError) {
			setUser(null);
		}
	}, [meQuery.isSuccess, meQuery.isError, meQuery.data]);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if (user) {
			interval = setInterval(async () => {
				try {
					const res = await authApi.refreshToken();
					internalSetAccessToken(res.data.access as string);
					setAccessToken(res.data.access as string);
				} catch {
					setUser(null);
					internalSetAccessToken(null);
					setAccessToken(null);
				}
			}, 15 * 60 * 1000);
		}
		return () => clearInterval(interval);
	}, [user]);

	const login = async (payload: LoginPayload) => {
		const res = await loginM.mutateAsync(payload);
		internalSetAccessToken(res.access_token);
		setAccessToken(res.access_token);
		setUser(res.user);
	};

	const register = async (payload: SignupPayload) => {
		const res = await registerM.mutateAsync(payload);
		internalSetAccessToken(res.access_token);
		setAccessToken(res.access_token);
		setUser(res.user);
	};

	const logout = async () => {
		await logoutM.mutateAsync();
		setUser(null);
		internalSetAccessToken(null);
		setAccessToken(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				role: meQuery.data?.role,
				isLoading: meQuery.isLoading || isInitializing,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
