import clsx from 'clsx';
import React from 'react';

interface CardProps {
	children: React.ReactNode;
	className?: string;
	padding?: 'none' | 'sm' | 'md' | 'lg';
	hover?: boolean;
}

export default function Card({
	children,
	className,
	padding = 'md',
	hover = false,
}: CardProps) {
	const paddings = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8',
	};

	return (
		<div
			className={clsx(
				'bg-white rounded-2xl border border-gray-100 shadow-card',
				paddings[padding],
				hover && 'card-hover cursor-pointer',
				className,
			)}
		>
			{children}
		</div>
	);
}

export function CardHeader({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={clsx('mb-4', className)}>{children}</div>;
}

export function CardTitle({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h3 className={clsx('text-lg font-semibold text-gray-900', className)}>
			{children}
		</h3>
	);
}

export function CardSubtitle({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<p className={clsx('text-sm text-gray-500 mt-0.5', className)}>
			{children}
		</p>
	);
}
