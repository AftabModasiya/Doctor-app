import {
	createContext,
	type ReactNode,
	useContext,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { signInAsyncThunk, logOutAsyncThunk } from "../store/auth/auth-async-thunk";

interface AuthContextType {
	user: any | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (email: string, password: string, deviceIp: string) => Promise<void>;
	logout: () => void;
	updateUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const { user, accessToken: token } = useAppSelector((state) => state.auth);

	const login = async (email: string, password: string, deviceIp: string) => {
		const resultAction = await dispatch(signInAsyncThunk({ email, password, deviceIp }));
		if (signInAsyncThunk.rejected.match(resultAction)) {
			throw new Error((resultAction.payload as any)?.message || "Invalid credentials");
		}
	};

	const logout = () => {
		dispatch(logOutAsyncThunk());
	};

	const updateUser = (_updatedUser: any) => {
		// This can be kept as a placeholder or connected to a Redux action if needed
		console.warn("updateUser called but not fully implemented with Redux yet");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: !!token,
				login,
				logout,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
