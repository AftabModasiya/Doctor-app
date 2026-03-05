import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	hint?: string;
}

export default function Input({
	label,
	error,
	leftIcon,
	rightIcon,
	hint,
	className,
	id,
	...props
}: InputProps) {
	const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-gray-700 mb-1.5"
				>
					{label}
					{props.required && <span className="text-rose-500 ml-1">*</span>}
				</label>
			)}
			<div className="relative">
				{leftIcon && (
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
						{leftIcon}
					</span>
				)}
				<input
					id={inputId}
					className={clsx(
						'w-full rounded-xl border bg-white text-gray-900 placeholder-gray-400 text-sm transition-all duration-200',
						'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
						error
							? 'border-rose-400 focus:ring-rose-400'
							: 'border-gray-200 hover:border-gray-300',
						leftIcon ? 'pl-10' : 'pl-4',
						rightIcon ? 'pr-10' : 'pr-4',
						'py-2.5',
						className,
					)}
					{...props}
				/>
				{rightIcon && (
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
						{rightIcon}
					</span>
				)}
			</div>
			{error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
			{hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
		</div>
	);
}
