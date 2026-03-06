import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	FaEdit,
	FaExclamationTriangle,
	FaPills,
	FaPlus,
	FaSearch,
	FaTrash,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import Table from "../../components/ui/Table";
import type { Medicine } from "../../types";
import { mockMedicines } from "../../utils/mockData";

const ITEMS_PER_PAGE = 8;
const CATEGORIES = [
	"Antibiotic",
	"Antidiabetic",
	"Antihypertensive",
	"Analgesic",
	"Antihistamine",
	"Proton Pump Inhibitor",
	"Lipid Lowering",
	"NSAID/Analgesic",
	"Antiviral",
	"Antifungal",
];

const stockVariant: Record<
	string,
	"success" | "warning" | "danger" | "neutral"
> = {
	"In Stock": "success",
	"Low Stock": "warning",
	"Out of Stock": "danger",
	"Near Expiry": "neutral",
};

export default function MedicinesPage() {
	const { t } = useTranslation();
	const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [editMed, setEditMed] = useState<Medicine | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<Medicine | null>(null);
	const { register, handleSubmit, reset, setValue } = useForm<Medicine>();

	const filtered = useMemo(
		() =>
			medicines.filter(
				(m) =>
					m.name.toLowerCase().includes(search.toLowerCase()) ||
					m.category.toLowerCase().includes(search.toLowerCase()),
			),
		[medicines, search],
	);

	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
	const paged = filtered.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const getStockStatus = (
		stock: number,
		expiry: string,
	): Medicine["status"] => {
		const daysToExpiry = (new Date(expiry).getTime() - Date.now()) / 86400000;
		if (stock === 0) return "Out of Stock";
		if (daysToExpiry < 60) return "Near Expiry";
		if (stock < 20) return "Low Stock";
		return "In Stock";
	};

	const openAdd = () => {
		setEditMed(null);
		reset();
		setModalOpen(true);
	};
	const openEdit = (m: Medicine) => {
		setEditMed(m);
		(Object.keys(m) as (keyof Medicine)[]).forEach((k) =>
			setValue(k, m[k] as string & number),
		);
		setModalOpen(true);
	};

	const onSubmit = (data: Medicine) => {
		const stockStatus = getStockStatus(Number(data.stock), data.expiryDate);
		if (editMed) {
			setMedicines((ms) =>
				ms.map((m) =>
					m.id === editMed.id
						? {
								...m,
								...data,
								stock: Number(data.stock),
								price: Number(data.price),
								status: stockStatus,
							}
						: m,
				),
			);
			toast.success(t("medicines.toast.updated"));
		} else {
			setMedicines((ms) => [
				{
					...data,
					id: `M${(ms.length + 1).toString().padStart(3, "0")}`,
					stock: Number(data.stock),
					price: Number(data.price),
					status: stockStatus,
				},
				...ms,
			]);
			toast.success(t("medicines.toast.added"));
		}
		setModalOpen(false);
	};

	const columns = [
		{
			key: "name",
			header: t("medicines.columns.medicine"),
			render: (m: Medicine) => (
				<div className="flex items-center gap-2.5">
					<div className="h-8 w-8 rounded-xl bg-violet-100 flex items-center justify-center">
						<FaPills className="h-3.5 w-3.5 text-violet-600" />
					</div>
					<div>
						<p className="text-sm font-semibold text-gray-900">{m.name}</p>
						<p className="text-xs text-gray-400">{m.manufacturer}</p>
					</div>
				</div>
			),
		},
		{
			key: "category",
			header: t("medicines.columns.category"),
			render: (m: Medicine) => <Badge variant="info">{m.category}</Badge>,
		},
		{
			key: "stock",
			header: t("medicines.columns.stock"),
			render: (m: Medicine) => (
				<div className="flex items-center gap-2">
					{m.stock < 20 && m.stock > 0 && (
						<FaExclamationTriangle className="h-3 w-3 text-amber-400" />
					)}
					<span
						className={`text-sm font-semibold ${m.stock === 0 ? "text-rose-600" : m.stock < 20 ? "text-amber-600" : "text-gray-800"}`}
					>
						{m.stock} {m.unit}
					</span>
				</div>
			),
		},
		{
			key: "price",
			header: t("medicines.columns.price"),
			render: (m: Medicine) => (
				<span className="font-mono text-sm font-medium">
					${m.price.toFixed(2)}
				</span>
			),
		},
		{
			key: "expiryDate",
			header: t("medicines.columns.expiry"),
			render: (m: Medicine) => {
				const daysLeft = Math.floor(
					(new Date(m.expiryDate).getTime() - Date.now()) / 86400000,
				);
				return (
					<span
						className={`text-sm ${daysLeft < 60 ? "text-amber-600 font-medium" : "text-gray-600"}`}
					>
						{m.expiryDate}
					</span>
				);
			},
		},
		{
			key: "status",
			header: t("medicines.columns.status"),
			render: (m: Medicine) => (
				<Badge variant={stockVariant[m.status]} dot>
					{m.status}
				</Badge>
			),
		},
		{
			key: "actions",
			header: t("medicines.columns.actions"),
			render: (m: Medicine) => (
				<div className="flex items-center gap-1">
					<button
						onClick={() => openEdit(m)}
						className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
					>
						<FaEdit className="h-3.5 w-3.5" />
					</button>
					<button
						onClick={() => setDeleteConfirm(m)}
						className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
					>
						<FaTrash className="h-3.5 w-3.5" />
					</button>
				</div>
			),
		},
	];

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{t("medicines.title")}</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						{medicines.length} {t("medicines.inInventory")}
					</p>
				</div>
				<Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
					{t("medicines.addMedicine")}
				</Button>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
				{[
					{
						label: t("medicines.inStock"),
						count: medicines.filter((m) => m.status === "In Stock").length,
						color: "bg-emerald-50 text-emerald-700",
					},
					{
						label: t("medicines.lowStock"),
						count: medicines.filter((m) => m.status === "Low Stock").length,
						color: "bg-amber-50 text-amber-700",
					},
					{
						label: t("medicines.outOfStock"),
						count: medicines.filter((m) => m.status === "Out of Stock").length,
						color: "bg-rose-50 text-rose-700",
					},
					{
						label: t("medicines.nearExpiry"),
						count: medicines.filter((m) => m.status === "Near Expiry").length,
						color: "bg-orange-50 text-orange-700",
					},
				].map((c) => (
					<div
						key={c.label}
						className={`${c.color} rounded-2xl p-4 border border-current/10`}
					>
						<p className="text-2xl font-bold">{c.count}</p>
						<p className="text-sm font-medium mt-0.5">{c.label}</p>
					</div>
				))}
			</div>

			<div className="bg-white rounded-2xl border border-gray-100 shadow-card">
				<div className="p-4 border-b border-gray-100">
					<div className="relative max-w-sm">
						<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
						<input
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setCurrentPage(1);
							}}
							placeholder={t("medicines.searchPlaceholder")}
							className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>
				<Table
					columns={columns}
					data={paged}
					emptyMessage={t("medicines.noMedicines")}
					emptyIcon={<FaPills />}
				/>
				<div className="px-4 border-t border-gray-50">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={filtered.length}
						itemsPerPage={ITEMS_PER_PAGE}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>

			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				title={editMed ? t("medicines.modal.editTitle") : t("medicines.modal.addTitle")}
				size="lg"
				footer={
					<>
						<Button variant="secondary" onClick={() => setModalOpen(false)}>
							{t("common.cancel")}
						</Button>
						<Button onClick={handleSubmit(onSubmit)}>
							{editMed ? t("medicines.modal.saveBtn") : t("medicines.modal.addBtn")}
						</Button>
					</>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="sm:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.medicineName")}
						</label>
						<input
							{...register("name")}
							placeholder={t("medicines.modal.medicineNamePlaceholder")}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.category")}
						</label>
						<select
							{...register("category")}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							{CATEGORIES.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.manufacturer")}
						</label>
						<input
							{...register("manufacturer")}
							placeholder={t("medicines.modal.manufacturerPlaceholder")}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.stockQuantity")}
						</label>
						<input
							{...register("stock")}
							type="number"
							placeholder="100"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.unit")}
						</label>
						<select
							{...register("unit")}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							{[
								"Tablets",
								"Capsules",
								"Syrup (ml)",
								"Injection (ml)",
								"Cream (g)",
								"Drops (ml)",
							].map((u) => (
								<option key={u} value={u}>
									{u}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.price")}
						</label>
						<input
							{...register("price")}
							type="number"
							step="0.01"
							placeholder="10.00"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("medicines.modal.expiryDate")}
						</label>
						<input
							{...register("expiryDate")}
							type="date"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>
			</Modal>

			{deleteConfirm && (
				<Modal
					isOpen={!!deleteConfirm}
					onClose={() => setDeleteConfirm(null)}
					title={t("medicines.modal.deleteTitle")}
					size="sm"
					footer={
						<>
							<Button
								variant="secondary"
								onClick={() => setDeleteConfirm(null)}
							>
								{t("common.cancel")}
							</Button>
							<Button
								variant="danger"
								onClick={() => {
									setMedicines((ms) =>
										ms.filter((m) => m.id !== deleteConfirm.id),
									);
									setDeleteConfirm(null);
									toast.success(t("medicines.toast.removed"));
								}}
							>
								{t("medicines.modal.deleteBtn")}
							</Button>
						</>
					}
				>
					<p className="text-sm text-gray-600">
						{t("medicines.modal.deleteConfirm")} <strong>{deleteConfirm.name}</strong> {t("medicines.modal.fromInventory")}
					</p>
				</Modal>
			)}
		</div>
	);
}
