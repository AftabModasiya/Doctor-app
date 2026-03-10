import type React from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
	footer?: React.ReactNode;
}

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	footer,
}: ModalProps) {
	useEffect(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [onClose]);

	if (!isOpen) return null;

	const sizes = {
		sm: "max-w-sm",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity duration-300"
				onClick={onClose}
			/>
			{/* Modal */}
			<div
				className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-elevated animate-fade-in max-h-[90vh] flex flex-col`}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
					<h2 className="text-lg font-semibold text-gray-900">{title}</h2>
					<button
						onClick={onClose}
						className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
					>
						<FaTimes className="h-4 w-4" />
					</button>
				</div>
				{/* Body */}
				<div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
				{/* Footer */}
				{footer && (
					<div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}
