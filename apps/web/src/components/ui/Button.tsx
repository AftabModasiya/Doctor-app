import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

export default function Button({
	children,
	variant = 'primary',
	size = 'md',
	loading = false,
	leftIcon,
	rightIcon,
	className,
	disabled,
	...props
}: ButtonProps) {
	const base =
		'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

	const variants = {
		primary:
			'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md active:scale-[0.98]',
		secondary:
			'bg-surface-tertiary text-gray-700 hover:bg-gray-200 border border-gray-200',
		danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
		ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
		outline: 'border border-primary-300 text-primary-700 hover:bg-primary-50',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2.5 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	return (
		<button
			className={clsx(base, variants[variant], sizes[size], className)}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
			) : (
				leftIcon
			)}
			{children}
			{!loading && rightIcon}
		</button>
	);
}
