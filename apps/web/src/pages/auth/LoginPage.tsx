import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
	FaArrowRight,
	FaEnvelope,
	FaHospital,
	FaLock,
	FaPills,
	FaUserInjured,
	FaUserMd,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object({
	email: yup.string().email('Invalid email').required('Email required'),
	password: yup
		.string()
		.min(6, 'Min 6 characters')
		.required('Password required'),
});
type FormData = { email: string; password: string };

const features = [
	{ icon: FaUserMd, label: 'Manage Doctors & Staff' },
	{ icon: FaUserInjured, label: 'Patient Records & History' },
	{ icon: FaPills, label: 'Prescription & Medicine Tracking' },
];

export default function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			await login(data.email, data.password);
			toast.success('Welcome back!');
			navigate('/dashboard');
		} catch {
			toast.error('Invalid credentials. Please try again.');
		} finally {
			setLoading(false);
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
						<h1 className="text-2xl font-bold text-white">MediAdmin</h1>
						<p className="text-sm text-white/70">Hospital Management System</p>
					</div>
				</div>

				<div className="relative z-10 flex-1 flex flex-col justify-center">
					<h2 className="text-4xl font-bold text-white leading-tight mb-4">
						Modern Healthcare
						<br />
						Administration
					</h2>
					<p className="text-lg text-white/80 mb-10">
						Streamline your hospital operations with our comprehensive
						management suite built for healthcare professionals.
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
					© 2025 MediAdmin. Secure & HIPAA Compliant.
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
						<h1 className="text-xl font-bold text-gray-900">MediAdmin</h1>
					</div>

					<div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-1">
								Welcome back
							</h2>
							<p className="text-sm text-gray-500">
								Sign in to your admin account to continue
							</p>
						</div>

						{/* Demo hint */}
						<div className="mb-6 p-3 bg-sky-50 border border-sky-200 rounded-xl">
							<p className="text-xs text-sky-700">
								<span className="font-semibold">Demo:</span> Use any email &
								password (min 6 chars) to login
							</p>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Email Address
								</label>
								<div className="relative">
									<FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<input
										{...register('email')}
										type="email"
										placeholder="admin@hospital.com"
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
										Password
									</label>
									<Link
										to="/forgot-password"
										className="text-xs text-primary-600 hover:text-primary-700 font-medium"
									>
										Forgot password?
									</Link>
								</div>
								<div className="relative">
									<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<input
										{...register('password')}
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
								disabled={loading}
								className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 shadow-sm hover:shadow-md active:scale-[0.98]"
							>
								{loading ? (
									<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
								) : (
									<>
										Sign In <FaArrowRight className="h-4 w-4" />
									</>
								)}
							</button>
						</form>

						<p className="mt-6 text-center text-sm text-gray-500">
							Don't have an account?{' '}
							<Link
								to="/signup"
								className="text-primary-600 hover:text-primary-700 font-semibold"
							>
								Create account
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
