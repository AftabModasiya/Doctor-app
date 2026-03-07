import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function TestimonialsSection() {
	const { t } = useTranslation();

	const testimonials = [
		{
			name: t("landing.testimonials.items.sarah.name"),
			title: t("landing.testimonials.items.sarah.title"),
			hospital: t("landing.testimonials.items.sarah.hospital"),
			avatar: "SM",
			avatarColor: "from-sky-400 to-blue-500",
			rating: 5,
			quote: t("landing.testimonials.items.sarah.quote"),
		},
		{
			name: t("landing.testimonials.items.james.name"),
			title: t("landing.testimonials.items.james.title"),
			hospital: t("landing.testimonials.items.james.hospital"),
			avatar: "JO",
			avatarColor: "from-emerald-400 to-teal-500",
			rating: 5,
			quote: t("landing.testimonials.items.james.quote"),
		},
		{
			name: t("landing.testimonials.items.priya.name"),
			title: t("landing.testimonials.items.priya.title"),
			hospital: t("landing.testimonials.items.priya.hospital"),
			avatar: "PS",
			avatarColor: "from-violet-400 to-purple-500",
			rating: 5,
			quote: t("landing.testimonials.items.priya.quote"),
		},
	];

	return (
		<section className="py-24 bg-white dark:bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<span className="inline-block text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
						{t("landing.testimonials.badge")}
					</span>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						{t("landing.testimonials.title")}{" "}
						<span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
							{t("landing.testimonials.titleHighlight")}
						</span>
					</h2>
					<p className="text-lg text-gray-500 dark:text-gray-400">
						{t("landing.testimonials.subtitle")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{testimonials.map(
						({ name, title, hospital, avatar, avatarColor, rating, quote }) => (
							<div
								key={name}
								className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-8"
							>
								<FaQuoteLeft className="h-7 w-7 text-primary-200 dark:text-primary-800 mb-4" />
								<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
									{quote}
								</p>
								<div className="flex gap-1 mb-5">
									{Array.from({ length: rating }).map((_, i) => (
										<FaStar key={i} className="h-4 w-4 text-amber-400" />
									))}
								</div>
								<div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
									<div
										className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
									>
										{avatar}
									</div>
									<div>
										<p className="text-sm font-bold text-gray-900 dark:text-white">
											{name}
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											{title}
										</p>
										<p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
											{hospital}
										</p>
									</div>
								</div>
							</div>
						),
					)}
				</div>

				<div className="mt-16 text-center">
					<p className="text-sm text-gray-400 dark:text-gray-500 mb-6 uppercase tracking-widest font-medium">
						{t("landing.testimonials.trustedBy")}
					</p>
					<div className="flex flex-wrap items-center justify-center gap-8">
						{[
							"Apollo Hospitals",
							"Fortis Health",
							"Max Healthcare",
							"Manipal Group",
							"Aster DM Health",
						].map((name) => (
							<span
								key={name}
								className="text-gray-400 dark:text-gray-600 font-bold text-lg tracking-tight hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
							>
								{name}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
