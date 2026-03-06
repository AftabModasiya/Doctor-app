import { FaArrowRight, FaCheckCircle, FaHospital } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CTASection() {
	const { t } = useTranslation();

	const perks = [
		t("landing.cta.perks.noCard"),
		t("landing.cta.perks.hipaa"),
		t("landing.cta.perks.trial"),
		t("landing.cta.perks.cancel"),
	];

	return (
		<section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-sky-600 dark:from-gray-950 dark:via-primary-950 dark:to-primary-900">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 right-0 w-80 h-80 bg-white/10 dark:bg-primary-500/20 rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 dark:bg-sky-500/10 rounded-full blur-3xl" />
			</div>

			<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<div className="inline-flex items-center justify-center h-16 w-16 bg-white/20 dark:bg-primary-600 rounded-3xl shadow-lg mb-8 mx-auto">
					<FaHospital className="h-8 w-8 text-white" />
				</div>

				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
					{t("landing.cta.title")}{" "}
					<span className="text-sky-200 dark:bg-gradient-to-r dark:from-primary-400 dark:to-sky-400 dark:bg-clip-text dark:text-transparent">
						{t("landing.cta.titleHighlight")}
					</span>
				</h2>
				<p className="text-lg text-blue-100 dark:text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
					{t("landing.cta.subtitle")}
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
					<Link
						to="/signup"
						className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-blue-50 text-primary-700 text-base font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
					>
						{t("landing.cta.startTrial")}
						<FaArrowRight className="h-4 w-4" />
					</Link>
					<Link
						to="/login"
						className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 hover:bg-white/20 text-white text-base font-semibold rounded-2xl backdrop-blur-sm transition-all"
					>
						{t("landing.cta.signInDashboard")}
					</Link>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-5 text-sm text-blue-100 dark:text-gray-400">
					{perks.map((perk) => (
						<div key={perk} className="flex items-center gap-2">
							<FaCheckCircle className="h-4 w-4 text-blue-200 dark:text-primary-400 flex-shrink-0" />
							<span>{perk}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
