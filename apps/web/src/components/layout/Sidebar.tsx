import clsx from 'clsx';
import {
	FaBars,
	FaCalendarCheck,
	FaChartBar,
	FaCog,
	FaHospital,
	FaNotesMedical,
	FaPills,
	FaSignOutAlt,
	FaTachometerAlt,
	FaTimes,
	FaUserInjured,
	FaUserMd,
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
	{ label: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
	{ label: 'Patients', path: '/patients', icon: FaUserInjured },
	{ label: 'Doctors', path: '/doctors', icon: FaUserMd },
	{ label: 'Medicines', path: '/medicines', icon: FaPills },
	{ label: 'Prescriptions', path: '/prescriptions', icon: FaNotesMedical },
	{ label: 'Appointments', path: '/appointments', icon: FaCalendarCheck },
	{ label: 'Reports', path: '/reports', icon: FaChartBar },
	{ label: 'Settings', path: '/settings', icon: FaCog },
];

interface SidebarProps {
	collapsed: boolean;
	onToggle: () => void;
	mobileOpen: boolean;
	onMobileClose: () => void;
}

export default function Sidebar({
	collapsed,
	onToggle,
	mobileOpen,
	onMobileClose,
}: SidebarProps) {
	const { logout, user } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			{/* Logo */}
			<div
				className={clsx(
					'flex items-center gap-3 px-4 py-5 border-b border-gray-100',
					collapsed ? 'justify-center' : '',
				)}
			>
				<div className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm">
					<FaHospital className="h-4 w-4 text-white" />
				</div>
				{!collapsed && (
					<div className="overflow-hidden">
						<p className="text-sm font-bold text-gray-900 leading-tight">
							MediAdmin
						</p>
						<p className="text-xs text-gray-500">Hospital Management</p>
					</div>
				)}
				<button
					onClick={onToggle}
					className="ml-auto p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors hidden lg:block"
				>
					{collapsed ? (
						<FaBars className="h-4 w-4" />
					) : (
						<FaTimes className="h-4 w-4" />
					)}
				</button>
			</div>

			{/* Nav Items */}
			<nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto no-scrollbar">
				{navItems.map(({ label, path, icon: Icon }) => (
					<NavLink
						key={path}
						to={path}
						onClick={onMobileClose}
						className={({ isActive }) =>
							clsx(
								'sidebar-link',
								isActive ? 'sidebar-link-active' : 'sidebar-link-inactive',
								collapsed && 'justify-center px-2',
							)
						}
						title={collapsed ? label : undefined}
					>
						<Icon className="h-4 w-4 flex-shrink-0" />
						{!collapsed && <span className="truncate">{label}</span>}
					</NavLink>
				))}
			</nav>

			{/* User + Logout */}
			<div className="px-2 pb-4 space-y-1 border-t border-gray-100 pt-3">
				{!collapsed && user && (
					<div className="px-3 py-2 rounded-xl bg-primary-50 mb-2">
						<p className="text-xs font-semibold text-primary-800 truncate">
							{user.name}
						</p>
						<p className="text-xs text-primary-600">{user.role}</p>
					</div>
				)}
				<button
					onClick={handleLogout}
					className={clsx(
						'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors',
						collapsed && 'justify-center px-2',
					)}
				>
					<FaSignOutAlt className="h-4 w-4 flex-shrink-0" />
					{!collapsed && 'Logout'}
				</button>
			</div>
		</div>
	);

	return (
		<>
			{/* Mobile Overlay */}
			{mobileOpen && (
				<div className="fixed inset-0 z-40 lg:hidden">
					<div
						className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
						onClick={onMobileClose}
					/>
					<aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-elevated animate-slide-in">
						<SidebarContent />
					</aside>
				</div>
			)}

			{/* Desktop Sidebar */}
			<aside
				className={clsx(
					'hidden lg:flex flex-col h-full bg-white border-r border-gray-100 transition-all duration-300 flex-shrink-0',
					collapsed ? 'w-16' : 'w-60',
				)}
			>
				<SidebarContent />
			</aside>
		</>
	);
}
