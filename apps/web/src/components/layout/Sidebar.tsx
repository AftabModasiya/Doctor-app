import clsx from "clsx";
import {
  FaCalendarCheck,
  FaChartBar,
  FaCog,
  FaHospital,
  FaNotesMedical,
  FaPills,
  FaSignOutAlt,
  FaSlidersH,
  FaTachometerAlt,
  FaTimes,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface SidebarContentProps {
  collapsed: boolean;
  onMobileClose: () => void;
  navItems: { label: string; path: string; icon: any }[];
  user: { name: string; role: string } | null;
  handleLogout: () => void;
  t: (key: string) => string;
}

const SidebarContent = ({
  collapsed,
  onMobileClose,
  navItems,
  user,
  handleLogout,
  t,
}: SidebarContentProps) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div
      className={clsx(
        "relative flex items-center gap-3 px-4 py-5 border-b border-gray-100",
        collapsed ? "justify-center" : "",
      )}
    >
      <div className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm">
        <FaHospital className="h-4 w-4 text-white" />
      </div>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-150 ease-out",
          collapsed
            ? "max-w-0 opacity-0 -translate-x-1"
            : "max-w-[180px] opacity-100 translate-x-0",
        )}
      >
        <p className="text-sm font-bold text-gray-900 leading-tight">
          {t("common.appName")}
        </p>
        <p className="text-xs text-gray-500">
          {t("sidebar.hospitalManagement")}
        </p>
      </div>
      <button
        onClick={onMobileClose}
        className="ml-auto p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors lg:hidden"
        aria-label="Close sidebar"
      >
        <FaTimes className="h-4 w-4" />
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
              "sidebar-link",
              isActive ? "sidebar-link-active" : "sidebar-link-inactive",
              collapsed && "justify-center px-2",
            )
          }
          title={collapsed ? label : undefined}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span
            className={clsx(
              "truncate transition-all duration-150 ease-out",
              collapsed
                ? "max-w-0 opacity-0 -translate-x-1"
                : "max-w-[140px] opacity-100 translate-x-0",
            )}
          >
            {label}
          </span>
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
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors",
          collapsed && "justify-center px-2",
        )}
      >
        <FaSignOutAlt className="h-4 w-4 flex-shrink-0" />
        <span
          className={clsx(
            "truncate transition-all duration-150 ease-out",
            collapsed
              ? "max-w-0 opacity-0 -translate-x-1"
              : "max-w-[100px] opacity-100 translate-x-0",
          )}
        >
          {t("common.logout")}
        </span>
      </button>
    </div>
  </div>
);

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: t("nav.dashboard"), path: "/dashboard", icon: FaTachometerAlt },
    { label: t("nav.patients"), path: "/patients", icon: FaUserInjured },
    { label: t("nav.doctors"), path: "/doctors", icon: FaUserMd },
    { label: t("nav.medicines"), path: "/medicines", icon: FaPills },
    {
      label: t("nav.prescriptions"),
      path: "/prescriptions",
      icon: FaNotesMedical,
    },
    {
      label: t("nav.appointments"),
      path: "/appointments",
      icon: FaCalendarCheck,
    },
    { label: t("nav.reports"), path: "/reports", icon: FaChartBar },
    { label: t("nav.appSettings"), path: "/app-settings", icon: FaSlidersH },
    { label: t("nav.settings"), path: "/settings", icon: FaCog },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const commonProps = {
    collapsed,
    onMobileClose,
    navItems,
    user: user as any, // Cast to any to avoid complex auth user typing mismatch if any
    handleLogout,
    t,
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-200",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0 bg-gray-900/40"
          onClick={onMobileClose}
        />
        <aside
          className={clsx(
            "absolute left-0 top-0 h-full w-64 bg-white shadow-elevated transform-gpu will-change-transform transition-transform duration-200 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent {...commonProps} />
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "relative hidden lg:flex flex-col h-full bg-white border-r border-gray-100 flex-shrink-0 overflow-visible transition-[width] duration-300 ease-in-out will-change-[width]",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <button
          onClick={onToggle}
          className="absolute left-full top-7 z-40 hidden -translate-x-1/2 p-1 text-primary-600 hover:text-primary-700 transition-all duration-200 ease-out lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <IoIosArrowDroprightCircle className="m-0 h-4 w-4" />
          ) : (
            <IoIosArrowDropleftCircle className="m-0 h-4 w-4" />
          )}
        </button>
        <SidebarContent {...commonProps} />
      </aside>
    </>
  );
}
