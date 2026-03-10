import clsx from "clsx";
import type React from "react";

interface Column<T> {
	key: keyof T | string;
	header: string;
	render?: (row: T) => React.ReactNode;
	className?: string;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	emptyMessage?: string;
	emptyIcon?: React.ReactNode;
	loading?: boolean;
	onRowClick?: (row: T) => void;
}

function TableSkeleton({
	rows = 5,
	cols = 4,
}: {
	rows?: number;
	cols?: number;
}) {
	return (
		<>
			{Array.from({ length: rows }).map((_, i) => (
				<tr key={i} className="border-b border-gray-50">
					{Array.from({ length: cols }).map((_, j) => (
						<td key={j} className="px-4 py-3.5">
							<div
								className="h-4 bg-gray-100 rounded animate-pulse"
								style={{ width: `${60 + Math.random() * 30}%` }}
							/>
						</td>
					))}
				</tr>
			))}
		</>
	);
}

export default function Table<T extends { id?: string | number }>({
	columns,
	data,
	emptyMessage = "No records found",
	emptyIcon,
	loading = false,
	onRowClick,
}: TableProps<T>) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-gray-100">
						{columns.map((col) => (
							<th
								key={String(col.key)}
								className={clsx(
									"px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
									col.className,
								)}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<TableSkeleton rows={5} cols={columns.length} />
					) : data.length === 0 ? (
						<tr>
							<td colSpan={columns.length} className="py-16 text-center">
								<div className="flex flex-col items-center gap-3 text-gray-400">
									{emptyIcon && <div className="text-4xl">{emptyIcon}</div>}
									<p className="text-sm font-medium">{emptyMessage}</p>
								</div>
							</td>
						</tr>
					) : (
						data.map((row, index) => (
							<tr
								key={row.id || index}
								className={clsx(
									"border-b border-gray-50 transition-colors duration-150",
									onRowClick
										? "cursor-pointer hover:bg-primary-50/50"
										: "hover:bg-gray-50/50",
								)}
								onClick={() => onRowClick?.(row)}
							>
								{columns.map((col) => (
									<td
										key={String(col.key)}
										className={clsx("px-4 py-3.5 text-gray-700", col.className)}
									>
										{col.render
											? col.render(row)
											: String(
													(row as Record<string, unknown>)[col.key as string] ??
														"",
												)}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
