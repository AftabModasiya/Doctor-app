import {
	FaEnvelope,
	FaFacebookF,
	FaHospital,
	FaInstagram,
	FaLinkedinIn,
	FaMapMarkerAlt,
	FaPhone,
	FaTwitter,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingFooter() {
	const { t } = useTranslation();

	const footerLinks = {
		// [t("landing.footer.product")]: [
		// 	t("landing.nav.features"),
		// 	t("landing.nav.modules"),
		// 	t("landing.nav.pricing"),
		// 	t("landing.footer.changelog"),
		// 	t("landing.footer.roadmap")
		// ],
		[t("landing.footer.company")]: [
			t("landing.footer.aboutUs"),
			t("landing.footer.blog"),
			t("landing.footer.careers"),
			t("landing.footer.press"),
			t("landing.footer.partners")
		],
		[t("landing.footer.support")]: [
			t("landing.footer.documentation"),
			t("landing.footer.helpCenter"),
			t("landing.footer.community"),
			t("landing.footer.status"),
			t("landing.nav.contact")
		],
		[t("landing.footer.legal")]: [
			t("landing.footer.privacyPolicy"),
			t("landing.footer.termsOfService"),
			t("landing.footer.cookiePolicy"),
			t("landing.footer.hipaa")
		],
	};

	return (
		<footer className="bg-gray-950 text-gray-300" id="contact">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
					{/* Brand Column */}
					<div className="lg:col-span-2">
						<Link to="/" className="flex items-center gap-2.5 mb-4">
							<div className="h-9 w-9 bg-primary-600 rounded-xl flex items-center justify-center">
								<FaHospital className="h-4 w-4 text-white" />
							</div>
							<span className="text-lg font-bold text-white">
								Medi<span className="text-primary-400">Admin</span>
							</span>
						</Link>
						<p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
							{t("landing.footer.tagline")}
						</p>
						<div className="space-y-2">
							{[
								{ icon: FaPhone, text: "+91 9106633917" },
								{ icon: FaEnvelope, text: "hello@mediadmin.io" },
								{
									icon: FaMapMarkerAlt,
									text: "123 Health St, SG Highway, Ahmedabad, Gujarat",
								},
							].map(({ icon: Icon, text }) => (
								<div
									key={text}
									className="flex items-center gap-3 text-sm text-gray-400"
								>
									<Icon className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
									<span>{text}</span>
								</div>
							))}
						</div>
					</div>

					{/* Link Columns */}
					{Object.entries(footerLinks).map(([heading, links]) => (
						<div key={heading}>
							<h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
								{heading}
							</h4>
							<ul className="space-y-2.5">
								{links.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="text-sm text-gray-400 hover:text-white transition-colors"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-500">
						© 2025 MediAdmin Inc. {t("landing.footer.rights")}
					</p>
					<div className="flex items-center gap-3">
						{[
							{ icon: FaFacebookF, label: "Facebook" },
							{ icon: FaTwitter, label: "Twitter" },
							{ icon: FaLinkedinIn, label: "LinkedIn" },
							{ icon: FaInstagram, label: "Instagram" },
						].map(({ icon: Icon, label }) => (
							<a
								key={label}
								href="#"
								aria-label={label}
								className="h-9 w-9 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
							>
								<Icon className="h-4 w-4" />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
