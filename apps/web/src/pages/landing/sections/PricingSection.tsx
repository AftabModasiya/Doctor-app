import clsx from "clsx";
import { FaCheck, FaStar, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function PricingSection() {
	const { t } = useTranslation();

	const plans = [
		{
			name: t("landing.pricing.plans.starter.name"),
			price: 49,
			period: t("common.month", { defaultValue: "/month" }),
			description: t("landing.pricing.plans.starter.desc"),
			highlight: false,
			ctaClass:
				"border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/30",
			features: [
				{ text: t("landing.pricing.plans.starter.features.doctors"), included: true },
				{ text: t("landing.pricing.plans.starter.features.patients"), included: true },
				{ text: t("landing.pricing.plans.starter.features.appointments"), included: true },
				{ text: t("landing.pricing.plans.starter.features.prescriptions"), included: true },
				{ text: t("landing.pricing.plans.starter.features.inventory"), included: true },
				{ text: t("landing.pricing.plans.starter.features.support"), included: true },
				{ text: t("landing.pricing.plans.starter.features.reports"), included: false },
				{ text: t("landing.pricing.plans.starter.features.branding"), included: false },
				{ text: t("landing.pricing.plans.starter.features.api"), included: false },
				{ text: t("landing.pricing.plans.starter.features.priority"), included: false },
			],
		},
		{
			name: t("landing.pricing.plans.professional.name"),
			price: 129,
			period: t("common.month", { defaultValue: "/month" }),
			description: t("landing.pricing.plans.professional.desc"),
			highlight: true,
			ctaClass:
				"bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200 dark:shadow-primary-900",
			features: [
				{ text: t("landing.pricing.plans.professional.features.doctors"), included: true },
				{ text: t("landing.pricing.plans.professional.features.patients"), included: true },
				{ text: t("landing.pricing.plans.professional.features.appointments"), included: true },
				{ text: t("landing.pricing.plans.professional.features.prescriptions"), included: true },
				{ text: t("landing.pricing.plans.professional.features.inventory"), included: true },
				{ text: t("landing.pricing.plans.professional.features.reports"), included: true },
				{ text: t("landing.pricing.plans.professional.features.branding"), included: true },
				{ text: t("landing.pricing.plans.professional.features.support"), included: true },
				{ text: t("landing.pricing.plans.professional.features.api"), included: false },
				{ text: t("landing.pricing.plans.professional.features.manager"), included: false },
			],
		},
		{
			name: t("landing.pricing.plans.enterprise.name"),
			price: 299,
			period: t("common.month", { defaultValue: "/month" }),
			description: t("landing.pricing.plans.enterprise.desc"),
			highlight: false,
			ctaClass:
				"border border-gray-800 text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
			features: [
				{ text: t("landing.pricing.plans.enterprise.features.doctors"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.patients"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.appointments"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.prescriptions"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.inventory"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.reports"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.branding"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.api"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.manager"), included: true },
				{ text: t("landing.pricing.plans.enterprise.features.support"), included: true },
			],
		},
	];

	return (
		<section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<span className="inline-block text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
						{t("landing.pricing.badge")}
					</span>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						{t("landing.pricing.title")}{" "}
						<span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
							{t("landing.pricing.titleHighlight")}
						</span>
					</h2>
					<p className="text-lg text-gray-500 dark:text-gray-400">
						{t("landing.pricing.subtitle")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
					{plans.map(
						({
							name,
							price,
							period,
							description,
							highlight,
							ctaClass,
							features,
						}) => (
							<div
								key={name}
								className={clsx(
									"relative bg-white dark:bg-gray-800 rounded-3xl border-2 p-8 transition-all duration-300",
									highlight
										? "border-primary-500 shadow-xl shadow-primary-100 dark:shadow-primary-900/30"
										: "border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5",
								)}
							>
								{highlight && (
									<div className="absolute -top-4 left-1/2 -translate-x-1/2">
										<span className="inline-flex items-center gap-1.5 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
											<FaStar className="h-3 w-3" /> {t("landing.pricing.mostPopular")}
										</span>
									</div>
								)}

								<div className="mb-6">
									<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
										{name}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
										{description}
									</p>
									<div className="flex items-baseline gap-1">
										<span className="text-4xl font-bold text-gray-900 dark:text-white">
											${price}
										</span>
										<span className="text-gray-500 dark:text-gray-400 text-sm">
											{period}
										</span>
									</div>
								</div>

								<Link
									to="/signup"
									className={clsx(
										"block w-full text-center py-3 rounded-2xl text-sm font-semibold transition-all mb-8",
										ctaClass,
									)}
								>
									{t("landing.pricing.getStarted")}
								</Link>

								<ul className="space-y-3">
									{features.map(({ text, included }) => (
										<li key={text} className="flex items-center gap-3">
											{included ? (
												<FaCheck className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
											) : (
												<FaTimes className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
											)}
											<span
												className={clsx(
													"text-sm",
													included
														? "text-gray-700 dark:text-gray-300"
														: "text-gray-400 dark:text-gray-600",
												)}
											>
												{text}
											</span>
										</li>
									))}
								</ul>
							</div>
						),
					)}
				</div>

				<p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
					<a
						href="#contact"
						className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
					>
						{t("landing.pricing.contactSales")}
					</a>
				</p>
			</div>
		</section>
	);
}
