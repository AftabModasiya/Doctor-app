import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEnvelope, FaHospital, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object({
	name: yup.string().min(2, 'Min 2 characters').required('Name required'),
	email: yup.string().email('Invalid email').required('Email required'),
	password: yup
		.string()
		.min(6, 'Min 6 characters')
		.required('Password required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm your password'),
});
type FormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function SignupPage() {
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
			await new Promise((r) => setTimeout(r, 800));
			await login(data.email, data.password);
			toast.success('Account created successfully!');
			navigate('/dashboard');
		} catch {
			toast.error('Signup failed. Please try again.');
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
						<h1 className="text-xl font-bold text-gray-900">MediAdmin</h1>
						<p className="text-xs text-gray-500">Hospital Management System</p>
					</div>
				</div>
				<div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-1">
							Create an account
						</h2>
						<p className="text-sm text-gray-500">
							Join MediAdmin to manage your hospital
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Full Name
							</label>
							<div className="relative">
								<FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									{...register('name')}
									type="text"
									placeholder="Dr. John Smith"
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
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Password
							</label>
							<div className="relative">
								<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									{...register('password')}
									type="password"
									placeholder="Min 6 characters"
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
								Confirm Password
							</label>
							<div className="relative">
								<FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									{...register('confirmPassword')}
									type="password"
									placeholder="Repeat your password"
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
								'Create Account'
							)}
						</button>
					</form>
					<p className="mt-6 text-center text-sm text-gray-500">
						Already have an account?{' '}
						<Link
							to="/login"
							className="text-primary-600 hover:text-primary-700 font-semibold"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
