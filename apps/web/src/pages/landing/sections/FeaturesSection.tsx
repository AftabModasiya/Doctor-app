import {
	FaBell,
	FaCalendarCheck,
	FaChartBar,
	FaMobile,
	FaNotesMedical,
	FaPills,
	FaShieldAlt,
	FaUserInjured,
	FaUserMd,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
	const { t } = useTranslation();

	const features = [
		{
			icon: FaUserInjured,
			title: t("landing.features.items.patients.title"),
			description: t("landing.features.items.patients.desc"),
			color: "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400",
			border: "hover:border-sky-200 dark:hover:border-sky-800",
		},
		{
			icon: FaUserMd,
			title: t("landing.features.items.doctors.title"),
			description: t("landing.features.items.doctors.desc"),
			color:
				"bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
			border: "hover:border-violet-200 dark:hover:border-violet-800",
		},
		{
			icon: FaPills,
			title: t("landing.features.items.medicines.title"),
			description: t("landing.features.items.medicines.desc"),
			color:
				"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
			border: "hover:border-emerald-200 dark:hover:border-emerald-800",
		},
		{
			icon: FaNotesMedical,
			title: t("landing.features.items.prescriptions.title"),
			description: t("landing.features.items.prescriptions.desc"),
			color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
			border: "hover:border-rose-200 dark:hover:border-rose-800",
		},
		{
			icon: FaCalendarCheck,
			title: t("landing.features.items.appointments.title"),
			description: t("landing.features.items.appointments.desc"),
			color:
				"bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
			border: "hover:border-amber-200 dark:hover:border-amber-800",
		},
		{
			icon: FaChartBar,
			title: t("landing.features.items.reports.title"),
			description: t("landing.features.items.reports.desc"),
			color: "bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400",
			border: "hover:border-teal-200 dark:hover:border-teal-800",
		},
		{
			icon: FaShieldAlt,
			title: t("landing.features.items.security.title"),
			description: t("landing.features.items.security.desc"),
			color:
				"bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
			border: "hover:border-indigo-200 dark:hover:border-indigo-800",
		},
		{
			icon: FaBell,
			title: t("landing.features.items.notifications.title"),
			description: t("landing.features.items.notifications.desc"),
			color:
				"bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
			border: "hover:border-orange-200 dark:hover:border-orange-800",
		},
		{
			icon: FaMobile,
			title: t("landing.features.items.mobile.title"),
			description: t("landing.features.items.mobile.desc"),
			color: "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400",
			border: "hover:border-pink-200 dark:hover:border-pink-800",
		},
	];

	return (
		<section id="features" className="py-24 bg-white dark:bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<span className="inline-block text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
						{t("landing.features.badge")}
					</span>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						{t("landing.features.title1")}{" "}
						<span className="bg-gradient-to-r from-primary-600 to-sky-500 bg-clip-text text-transparent">
							{t("landing.features.titleHighlight")}
						</span>
					</h2>
					<p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
						{t("landing.features.subtitle")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map(({ icon: Icon, title, description, color, border }) => (
						<div
							key={title}
							className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default ${border}`}
						>
							<div
								className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${color} transition-transform group-hover:scale-110`}
							>
								<Icon className="h-6 w-6" />
							</div>
							<h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
								{title}
							</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
								{description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
