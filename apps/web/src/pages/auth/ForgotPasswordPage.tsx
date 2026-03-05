import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
	FaArrowLeft,
	FaCheckCircle,
	FaEnvelope,
	FaHospital,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		setLoading(true);
		await new Promise((r) => setTimeout(r, 1000));
		setSent(true);
		toast.success('Reset link sent!');
		setLoading(false);
	};

	return (
		<div className="min-h-screen bg-surface-secondary flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<div className="flex items-center gap-3 mb-8 justify-center">
					<div className="h-11 w-11 bg-primary-600 rounded-2xl flex items-center justify-center shadow-sm">
						<FaHospital className="h-5 w-5 text-white" />
					</div>
					<h1 className="text-xl font-bold text-gray-900">MediAdmin</h1>
				</div>
				<div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
					{sent ? (
						<div className="text-center py-4">
							<div className="flex justify-center mb-4">
								<div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
									<FaCheckCircle className="h-8 w-8 text-emerald-500" />
								</div>
							</div>
							<h2 className="text-xl font-bold text-gray-900 mb-2">
								Check your email
							</h2>
							<p className="text-sm text-gray-500 mb-6">
								We sent a password reset link to <strong>{email}</strong>
							</p>
							<Link
								to="/login"
								className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
							>
								<FaArrowLeft className="h-3 w-3" /> Back to sign in
							</Link>
						</div>
					) : (
						<>
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-gray-900 mb-1">
									Reset password
								</h2>
								<p className="text-sm text-gray-500">
									Enter your email to receive a password reset link
								</p>
							</div>
							<form onSubmit={handleSubmit} className="space-y-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										Email Address
									</label>
									<div className="relative">
										<FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											placeholder="admin@hospital.com"
											className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-gray-300"
										/>
									</div>
								</div>
								<button
									type="submit"
									disabled={loading}
									className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 shadow-sm"
								>
									{loading ? (
										<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
									) : (
										'Send Reset Link'
									)}
								</button>
							</form>
							<div className="mt-6 text-center">
								<Link
									to="/login"
									className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
								>
									<FaArrowLeft className="h-3 w-3" /> Back to sign in
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
