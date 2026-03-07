import { useEffect, useRef, useState } from "react";
import {
	FaBars,
	FaBell,
	FaChevronDown,
	FaCog,
	FaSearch,
	FaSignOutAlt,
	FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
	onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
	const { t } = useTranslation();
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
			{/* Left */}
			<div className="flex items-center gap-3">
				<button
					onClick={onMenuClick}
					className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
				>
					<FaBars className="h-5 w-5" />
				</button>
				<div className="relative hidden sm:block">
					<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
					<input
						type="text"
						placeholder={t("navbar.searchPlaceholder")}
						className="pl-9 pr-4 py-2 text-sm bg-surface-secondary border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 transition-all"
					/>
				</div>
			</div>

			{/* Right */}
			<div className="flex items-center gap-2">
				{/* Notifications */}
				<button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
					<FaBell className="h-5 w-5" />
					<span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full" />
				</button>

				{/* Profile Dropdown */}
				<div className="relative" ref={dropdownRef}>
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
					>
						<div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
							<span className="text-white text-xs font-bold">
								{user?.name
									?.split(" ")
									.map((n) => n[0])
									.join("")
									.slice(0, 2)}
							</span>
						</div>
						<div className="hidden md:block text-left">
							<p className="text-sm font-semibold text-gray-900 leading-tight">
								{user?.name || "Admin"}
							</p>
							<p className="text-xs text-gray-500">{user?.role}</p>
						</div>
						<FaChevronDown
							className={`h-3 w-3 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
						/>
					</button>

					{dropdownOpen && (
						<div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-elevated border border-gray-100 z-50 animate-fade-in overflow-hidden">
							<div className="px-4 py-3 border-b border-gray-100">
								<p className="text-sm font-semibold text-gray-900">
									{user?.name}
								</p>
								<p className="text-xs text-gray-500">{user?.email}</p>
							</div>
							<button
								onClick={() => {
									navigate("/settings");
									setDropdownOpen(false);
								}}
								className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
							>
								<FaUserCircle className="h-4 w-4 text-gray-400" />
								{t("common.profile")}
							</button>
							<button
								onClick={() => {
									navigate("/settings");
									setDropdownOpen(false);
								}}
								className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
							>
								<FaCog className="h-4 w-4 text-gray-400" />
								{t("common.settings")}
							</button>
							<div className="border-t border-gray-100">
								<button
									onClick={handleLogout}
									className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
								>
									<FaSignOutAlt className="h-4 w-4" />
									{t("common.signOut")}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
