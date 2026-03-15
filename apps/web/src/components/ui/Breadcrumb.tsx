import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";
import clsx from "clsx";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
	return (
		<nav
			className={clsx("flex py-1 overflow-x-auto no-scrollbar", className)}
			aria-label="Breadcrumb"
		>
			<ol className="inline-flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
				{items.map((item, index) => (
					<li key={index} className="inline-flex items-center">
						{index > 0 && (
							<FaChevronRight className="w-2.5 h-2.5 text-gray-400 mx-1.5 flex-shrink-0" />
						)}
						{item.href ? (
							<Link
								to={item.href}
								className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-all duration-200"
							>
								{index === 0 &&
									(item.label.toLowerCase().includes("dashboard") ||
										item.label.toLowerCase().includes("home") ||
										item.href === "/") && (
										<FaHome className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
									)}
								{item.label}
							</Link>
						) : (
							<span className="text-sm font-semibold text-gray-900">
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
