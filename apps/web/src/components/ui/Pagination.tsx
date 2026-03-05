import clsx from 'clsx';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}: PaginationProps) {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
		(p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
	);

	return (
		<div className="flex items-center justify-between px-1 py-3">
			<p className="text-sm text-gray-500">
				Showing{' '}
				<span className="font-medium text-gray-700">
					{startItem}–{endItem}
				</span>{' '}
				of <span className="font-medium text-gray-700">{totalItems}</span>{' '}
				results
			</p>
			<div className="flex items-center gap-1">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
				>
					<FaChevronLeft className="h-3 w-3" />
				</button>
				{pages.map((page, i) => {
					const prev = pages[i - 1];
					const showEllipsis = prev && page - prev > 1;
					return (
						<React.Fragment key={page}>
							{showEllipsis && (
								<span className="px-2 text-gray-400 text-sm">…</span>
							)}
							<button
								onClick={() => onPageChange(page)}
								className={clsx(
									'min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-colors',
									currentPage === page
										? 'bg-primary-600 text-white shadow-sm'
										: 'text-gray-600 hover:bg-gray-100',
								)}
							>
								{page}
							</button>
						</React.Fragment>
					);
				})}
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
				>
					<FaChevronRight className="h-3 w-3" />
				</button>
			</div>
		</div>
	);
}
