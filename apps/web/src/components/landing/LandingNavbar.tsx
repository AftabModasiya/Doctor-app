import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaBars, FaHospital, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function LandingNavbar() {
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { user } = useAuth();
	const { theme, toggleTheme } = useTheme();

	const navLinks = [
		{ label: t("landing.nav.home"), href: "#home" },
		{ label: t("landing.nav.features"), href: "#features" },
		{ label: t("landing.nav.modules"), href: "#modules" },
		{ label: t("landing.nav.pricing"), href: "#pricing" },
		{ label: t("landing.nav.contact"), href: "#contact" },
	];

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleScroll = (href: string) => {
		setMobileOpen(false);
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	// In dark mode the navbar can always show inverted, in light mode it flips on scroll
	const isDark = theme === "dark";

	return (
		<nav
			className={clsx(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isDark
					? scrolled
						? "bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-800"
						: "bg-transparent"
					: scrolled
						? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
						: "bg-transparent",
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2.5">
						<div className="h-9 w-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm">
							<FaHospital className="h-4 w-4 text-white" />
						</div>
						<span
							className={clsx(
								"text-lg font-bold transition-colors",
								isDark
									? "text-white"
									: scrolled
										? "text-gray-900"
										: "text-gray-900",
							)}
						>
							Medi<span className="text-primary-500">Admin</span>
						</span>
					</Link>

					{/* Desktop Nav Links */}
					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<button
								key={link.label}
								onClick={() => handleScroll(link.href)}
								className={clsx(
									"px-4 py-2 text-sm font-medium rounded-lg transition-colors",
									isDark
										? "text-gray-300 hover:text-white hover:bg-white/10"
										: scrolled
											? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
											: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
								)}
							>
								{link.label}
							</button>
						))}
					</div>

					{/* Desktop: theme toggle + auth buttons */}
					<div className="hidden md:flex items-center gap-2">
						{/* Theme Toggle */}
						<button
							onClick={toggleTheme}
							aria-label="Toggle theme"
							className={clsx(
								"h-9 w-9 flex items-center justify-center rounded-xl transition-all",
								isDark
									? "text-amber-400 hover:bg-white/10 hover:text-amber-300"
									: scrolled
										? "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
										: "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
							)}
						>
							{theme === "dark" ? (
								<FaSun className="h-4 w-4" />
							) : (
								<FaMoon className="h-4 w-4" />
							)}
						</button>

						<Link
							to={user ? "/dashboard" : "/login"}
							className={clsx(
								"px-4 py-2 text-sm font-medium rounded-xl transition-all",
								isDark
									? "text-gray-300 hover:text-white hover:bg-white/10"
									: scrolled
										? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
										: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
							)}
						>
							{user ? t("common.dashboard") : t("common.login")}
						</Link>
						<Link
							to="/signup"
							className="px-5 py-2 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
						>
							{t("landing.nav.getStarted")}
						</Link>
					</div>

					{/* Mobile: theme toggle + hamburger */}
					<div className="md:hidden flex items-center gap-1">
						<button
							onClick={toggleTheme}
							aria-label="Toggle theme"
							className={clsx(
								"h-9 w-9 flex items-center justify-center rounded-lg transition-colors",
								isDark
									? "text-amber-400 hover:bg-white/10"
									: "text-gray-500 hover:bg-gray-100",
							)}
						>
							{theme === "dark" ? (
								<FaSun className="h-4 w-4" />
							) : (
								<FaMoon className="h-4 w-4" />
							)}
						</button>
						<button
							onClick={() => setMobileOpen(!mobileOpen)}
							className={clsx(
								"p-2 rounded-lg transition-colors",
								isDark
									? "text-gray-300 hover:bg-white/10"
									: "text-gray-600 hover:bg-gray-100",
							)}
						>
							{mobileOpen ? (
								<FaTimes className="h-5 w-5" />
							) : (
								<FaBars className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={clsx(
					"md:hidden border-t shadow-lg transition-all duration-300 overflow-hidden",
					isDark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-100",
					mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div className="px-4 py-4 space-y-1">
					{navLinks.map((link) => (
						<button
							key={link.label}
							onClick={() => handleScroll(link.href)}
							className={clsx(
								"w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
								isDark
									? "text-gray-300 hover:text-white hover:bg-white/10"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
							)}
						>
							{link.label}
						</button>
					))}
					<div
						className={clsx(
							"pt-3 border-t flex flex-col gap-2",
							isDark ? "border-gray-800" : "border-gray-100",
						)}
					>
						<Link
							to={user ? "/dashboard" : "/login"}
							onClick={() => setMobileOpen(false)}
							className={clsx(
								"w-full text-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors border",
								isDark
									? "text-gray-300 border-gray-700 hover:bg-white/10"
									: "text-gray-700 border-gray-200 hover:bg-gray-50",
							)}
						>
							{user ? t("common.dashboard") : t("common.login")}
						</Link>
						<Link
							to="/signup"
							onClick={() => setMobileOpen(false)}
							className="w-full text-center px-4 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl transition-colors hover:bg-primary-700"
						>
							{t("landing.nav.getStartedFree")}
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
