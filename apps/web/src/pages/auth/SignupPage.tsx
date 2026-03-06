import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaHospital, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";

type FormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function SignupPage() {
	const { t } = useTranslation();
	const { login } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const schema = yup.object({
		name: yup.string().min(2, t("validation.nameMin")).required(t("validation.nameRequired")),
		email: yup.string().email(t("validation.emailInvalid")).required(t("validation.emailRequired")),
		password: yup
			.string()
			.min(6, t("validation.passwordMin"))
			.required(t("validation.passwordRequired")),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], t("validation.passwordsMustMatch"))
			.required(t("validation.confirmPasswordRequired")),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 800));
			await login(data.email, data.password);
			toast.success(t("auth.toast.accountCreated"));
			navigate("/dashboard");
		} catch {
			toast.error(t("auth.toast.signupFailed"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-surface-secondary flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<div className="flex items-center gap-3 mb-8 justify-center">
					<div className="h-11 w-11 bg-primary-600 rounded-2xl flex items-center justify-center shadow-sm">
						<FaHospital className="h-5 w-5 text-white" />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">{t("common.appName")}</h1>
						<p className="text-xs text-gray-500">{t("common.tagline")}</p>
					</div>
				</div>
				<div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-1">
							{t("auth.createAccountTitle")}
						</h2>
						<p className="text-sm text-gray-500">
							{t("auth.createAccountSubtitle")}
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								{t("auth.fullName")}
							</label>
							<div className="relative">
								<FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									{...register("name")}
									type="text"
									placeholder={t("auth.fullNamePlaceholder")}
									className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-gray-300"
								/>
							</div>
							{errors.name && (
								<p className="mt-1 text-xs text-rose-600">
									{errors.name.message}
								</p>
							)}
						</div>
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
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								{t("auth.password")}
							</label>
							<div className="relative">
								<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									{...register("password")}
									type="password"
									placeholder={t("auth.passwordPlaceholder")}
									className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-gray-300"
								/>
							</div>
							{errors.password && (
								<p className="mt-1 text-xs text-rose-600">
									{errors.password.message}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								{t("auth.confirmPassword")}
							</label>
							<div className="relative">
								<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									{...register("confirmPassword")}
									type="password"
									placeholder={t("auth.confirmPasswordPlaceholder")}
									className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-gray-300"
								/>
							</div>
							{errors.confirmPassword && (
								<p className="mt-1 text-xs text-rose-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
						<button
							type="submit"
							disabled={loading}
							className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 shadow-sm mt-2"
						>
							{loading ? (
								<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
							) : (
								t("auth.createAccountBtn")
							)}
						</button>
					</form>
					<p className="mt-6 text-center text-sm text-gray-500">
						{t("auth.alreadyHaveAccount")}{" "}
						<Link
							to="/login"
							className="text-primary-600 hover:text-primary-700 font-semibold"
						>
							{t("auth.signIn")}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
