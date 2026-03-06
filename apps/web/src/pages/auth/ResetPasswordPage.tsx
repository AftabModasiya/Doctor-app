import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaHospital, FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirm) {
			toast.error(t("settings.password.toast.noMatch"));
			return;
		}
		if (password.length < 6) {
			toast.error(t("settings.password.toast.minLength"));
			return;
		}
		setLoading(true);
		await new Promise((r) => setTimeout(r, 800));
		setDone(true);
		toast.success(t("auth.toast.resetSuccess"));
		setLoading(false);
		setTimeout(() => navigate("/login"), 2000);
	};

	return (
		<div className="min-h-screen bg-surface-secondary flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<div className="flex items-center gap-3 mb-8 justify-center">
					<div className="h-11 w-11 bg-primary-600 rounded-2xl flex items-center justify-center shadow-sm">
						<FaHospital className="h-5 w-5 text-white" />
					</div>
					<h1 className="text-xl font-bold text-gray-900">{t("common.appName")}</h1>
				</div>
				<div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
					{done ? (
						<div className="text-center py-4">
							<div className="flex justify-center mb-4">
								<div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
									<FaCheckCircle className="h-8 w-8 text-emerald-500" />
								</div>
							</div>
							<h2 className="text-xl font-bold text-gray-900 mb-2">
								{t("auth.resetPassword.doneTitle")}
							</h2>
							<p className="text-sm text-gray-500">{t("auth.resetPassword.redirecting")}</p>
						</div>
					) : (
						<>
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-gray-900 mb-1">
									{t("auth.resetPassword.title")}
								</h2>
								<p className="text-sm text-gray-500">
									{t("auth.resetPassword.subtitle")}
								</p>
							</div>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										{t("auth.resetPassword.newPassword")}
									</label>
									<div className="relative">
										<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder={t("auth.resetPassword.passwordPlaceholder")}
											className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-gray-300"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										{t("auth.resetPassword.confirmPassword")}
									</label>
									<div className="relative">
										<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
										<input
											type="password"
											value={confirm}
											onChange={(e) => setConfirm(e.target.value)}
											required
											placeholder={t("auth.confirmPasswordPlaceholder")}
											className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-gray-300"
										/>
									</div>
								</div>
								<button
									type="submit"
									disabled={loading}
									className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 shadow-sm mt-2"
								>
									{loading ? (
										<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
									) : (
										t("auth.resetPassword.submitBtn")
									)}
								</button>
							</form>
							<div className="mt-6 text-center">
								<Link
									to="/login"
									className="text-sm text-gray-500 hover:text-gray-700"
								>
									{t("auth.backToSignIn")}
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
