import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
	FaArrowRight,
	FaEnvelope,
	FaHospital,
	FaLock,
	FaPills,
	FaUserInjured,
	FaUserMd,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/store";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";

type FormData = { email: string; password: string };

export default function LoginPage() {
	const { t } = useTranslation();
	const { login } = useAuth();
	const { loading: authLoading } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const [deviceIp, setDeviceIp] = useState<string>("0.0.0.0");

	useEffect(() => {
		const fetchIp = async () => {
			try {
				const response = await fetch("https://api.ipify.org?format=json");
				const data = await response.json();
				setDeviceIp(data.ip);
			} catch (error) {
				console.error("Failed to fetch IP", error);
			}
		};
		fetchIp();
	}, []);

	const schema = yup.object({
		email: yup.string().email(t("validation.emailInvalid")).required(t("validation.emailRequired")),
		password: yup
			.string()
			.min(6, t("validation.passwordMin"))
			.required(t("validation.passwordRequired")),
	});

	const features = [
		{ icon: FaUserMd, label: t("auth.manageDoctors") },
		{ icon: FaUserInjured, label: t("auth.patientRecords") },
		{ icon: FaPills, label: t("auth.prescriptionTracking") },
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = async (data: FormData) => {
		try {
			await login(data.email, data.password, deviceIp);
			navigate("/dashboard");
		} catch (error: any) {
			// Thunk and context handles toasts and errors now
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left – Branding Panel */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex-col p-12 relative overflow-hidden">
				{/* Grid pattern */}
				<div className="absolute inset-0 opacity-10">
					<svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								id="login-grid"
								width="60"
								height="60"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M 60 0 L 0 0 0 60"
									fill="none"
									stroke="white"
									strokeWidth="1"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#login-grid)" />
					</svg>
				</div>
				{/* Floating circles */}
				<div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5" />
				<div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

				<div className="relative z-10 flex items-center gap-3 mb-12">
					<div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
						<FaHospital className="h-6 w-6 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-white">{t("common.appName")}</h1>
						<p className="text-sm text-white/70">{t("common.tagline")}</p>
					</div>
				</div>

				<div className="relative z-10 flex-1 flex flex-col justify-center">
					<h2 className="text-4xl font-bold text-white leading-tight mb-4">
						{t("auth.modernHealthcare")}
						<br />
						{t("auth.administration")}
					</h2>
					<p className="text-lg text-white/80 mb-10">
						{t("auth.managementSuiteDesc")}
					</p>
					<div className="space-y-4">
						{features.map(({ icon: Icon, label }, i) => (
							<div key={i} className="flex items-center gap-3">
								<div className="h-8 w-8 bg-white/15 rounded-lg flex items-center justify-center">
									<Icon className="h-4 w-4 text-white" />
								</div>
								<span className="text-white/90 text-sm font-medium">
									{label}
								</span>
							</div>
						))}
					</div>
				</div>
				<p className="relative z-10 text-white/40 text-xs">
					{t("auth.copyright")}
				</p>
			</div>

			{/* Right – Form */}
			<div className="flex-1 flex items-center justify-center p-8 bg-surface-secondary">
				<div className="w-full max-w-md">
					{/* Mobile logo */}
					<div className="flex items-center gap-3 mb-8 lg:hidden">
						<div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center">
							<FaHospital className="h-5 w-5 text-white" />
						</div>
						<h1 className="text-xl font-bold text-gray-900">{t("common.appName")}</h1>
					</div>

					<div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-1">
								{t("auth.welcomeBack")}
							</h2>
							<p className="text-sm text-gray-500">
								{t("auth.signInSubtitle")}
							</p>
						</div>

						{/* Demo hint */}
						<div className="mb-6 p-3 bg-sky-50 border border-sky-200 rounded-xl">
							<p className="text-xs text-sky-700">
								<span className="font-semibold">{t("auth.demo")}</span>{" "}
								{t("auth.demoHint")}
							</p>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									{t("auth.emailAddress")}
								</label>
								<div className="relative">
									<FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<input
										{...register("email")}
										type="email"
										placeholder={t("auth.emailPlaceholder")}
										className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-gray-300"
									/>
								</div>
								{errors.email && (
									<p className="mt-1 text-xs text-rose-600">
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<div className="flex justify-between mb-1.5">
									<label className="text-sm font-medium text-gray-700">
										{t("auth.password")}
									</label>
									<Link
										to="/forgot-password"
										className="text-xs text-primary-600 hover:text-primary-700 font-medium"
									>
										{t("auth.forgotPassword")}
									</Link>
								</div>
								<div className="relative">
									<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<input
										{...register("password")}
										type="password"
										placeholder="••••••••"
										className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-gray-300"
									/>
								</div>
								{errors.password && (
									<p className="mt-1 text-xs text-rose-600">
										{errors.password.message}
									</p>
								)}
							</div>

							<button
								type="submit"
								disabled={authLoading}
								className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 shadow-sm hover:shadow-md active:scale-[0.98]"
							>
								{authLoading ? (
									<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
								) : (
									<>
										{t("auth.signIn")} <FaArrowRight className="h-4 w-4" />
									</>
								)}
							</button>
						</form>

						<p className="mt-6 text-center text-sm text-gray-500">
							{t("auth.noAccount")}{" "}
							<Link
								to="/signup"
								className="text-primary-600 hover:text-primary-700 font-semibold"
							>
								{t("auth.createAccount")}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
