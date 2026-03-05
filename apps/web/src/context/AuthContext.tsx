import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import type { AdminUser } from '../types';

interface AuthContextType {
	user: AdminUser | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	updateUser: (user: AdminUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demo
const MOCK_ADMIN: AdminUser = {
	id: 'ADM001',
	name: 'Dr. Admin Clarke',
	email: 'admin@mediadmin.com',
	role: 'Super Admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AdminUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');
		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		// Mock authentication - accepts any credentials with valid format
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (!email || !password) throw new Error('Invalid credentials');

		const mockToken = `mock-jwt-token-${Date.now()}`;
		const loggedUser = { ...MOCK_ADMIN, email };

		localStorage.setItem('token', mockToken);
		localStorage.setItem('user', JSON.stringify(loggedUser));
		setToken(mockToken);
		setUser(loggedUser);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken(null);
		setUser(null);
	};

	const updateUser = (updatedUser: AdminUser) => {
		setUser(updatedUser);
		localStorage.setItem('user', JSON.stringify(updatedUser));
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: !!token,
				isLoading,
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
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
