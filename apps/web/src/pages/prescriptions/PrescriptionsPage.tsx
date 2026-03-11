import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaPlus, FaNotesMedical, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	getDoctorMetadataAsyncThunk,
	getPatientMetadataAsyncThunk,
	getMedicineMetadataAsyncThunk,
} from "../../store/metadata/metadata-async-thunk";
import {
	createPrescriptionAsyncThunk,
	getPrescriptionsAsyncThunk,
	deletePrescriptionAsyncThunk,
} from "../../store/prescription/prescription-async-thunk";
import type { IPrescription } from "../../models/prescription";
import Breadcrumb from "@components/ui/Breadcrumb";

const statusVariant: Record<string, "success" | "info" | "danger"> = {
	Active: "success",
	active: "success",
	Completed: "info",
	completed: "info",
	Cancelled: "danger",
	cancelled: "danger",
};

export default function PrescriptionsPage() {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	// Get state from store
	const {
		patients: patientMetadata,
		doctors: doctorMetadata,
		medicines: medicineMetadata,
	} = useAppSelector((state) => state.metadata);
	const { prescriptions, isFetching } = useAppSelector(
		(state) => state.prescription,
	);

	useEffect(() => {
		dispatch(getPrescriptionsAsyncThunk());
		dispatch(getPatientMetadataAsyncThunk());
		dispatch(getDoctorMetadataAsyncThunk());
		dispatch(getMedicineMetadataAsyncThunk());
	}, [dispatch]);

	const [search, setSearch] = useState("");
	const [viewRx, setViewRx] = useState<IPrescription | null>(null);
	const [deleteRx, setDeleteRx] = useState<IPrescription | null>(null);
	const [createOpen, setCreateOpen] = useState(false);
	const [selectedMeds, setSelectedMeds] = useState<{ medicineId: string; quantity: string }[]>([]);
	const [form, setForm] = useState({
		patientId: "",
		doctorId: "",
		diagnosis: "",
		notes: "",
	});

	const addMed = () =>
		setSelectedMeds((sm) => [
			...sm,
			{
				medicineId: "",
				quantity: "1",
			},
		]);

	const updateMed = (
		i: number,
		field: "medicineId" | "quantity",
		val: string,
	) => {
		setSelectedMeds((sm) =>
			sm.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)),
		);
	};

	const handleCreate = () => {
		if (!form.patientId || !form.doctorId || !form.diagnosis) {
			toast.error(t("prescriptions.toast.fillRequired"));
			return;
		}

		if (selectedMeds.length === 0 || selectedMeds.some(m => !m.medicineId || !m.quantity)) {
			toast.error(t("prescriptions.toast.selectMedicine"));
			return;
		}

		const payload = {
			patientId: Number(form.patientId),
			doctorId: Number(form.doctorId),
			companyId: 1,
			diagnosis: form.diagnosis,
			notes: form.notes,
			medicinePrescriptions: selectedMeds.map(m => ({
				medicineId: Number(m.medicineId),
				quantity: Number(m.quantity)
			}))
		};

		dispatch(createPrescriptionAsyncThunk(payload)).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				dispatch(getPrescriptionsAsyncThunk());
				setCreateOpen(false);
				setForm({ patientId: "", doctorId: "", diagnosis: "", notes: "" });
				setSelectedMeds([]);
			}
		});
	};

	const handleDelete = (id: number) => {
		dispatch(deletePrescriptionAsyncThunk(id)).then(() => {
			dispatch(getPrescriptionsAsyncThunk());
			setDeleteRx(null);
		});
	};

	const columns = [
		{
			key: "id",
			header: t("prescriptions.columns.rxId"),
			render: (p: IPrescription) => (
				<span className="font-mono text-xs font-semibold text-primary-600">
					RX{p.id.toString().padStart(3, "0")}
				</span>
			),
		},
		{
			key: "patientName",
			header: t("prescriptions.columns.patient"),
			render: (p: IPrescription) => (
				<div>
					<p className="text-sm font-semibold text-gray-900">{p.patient?.user?.name || t("common.na")}</p>
					<p className="text-xs text-gray-400">ID: {p.patientId}</p>
				</div>
			),
		},
		{
			key: "doctorName",
			header: t("prescriptions.columns.doctor"),
			render: (p: IPrescription) => (
				<span className="text-sm text-gray-700">{p.doctor?.user?.name || t("common.na")}</span>
			),
		},
		{
			key: "diagnosis",
			header: t("prescriptions.columns.diagnosis"),
			render: (p: IPrescription) => (
				<span className="text-sm text-gray-700">{p.diagnosis}</span>
			),
		},
		{
			key: "date",
			header: t("prescriptions.columns.date"),
			render: (p: IPrescription) => (
				<span className="text-sm text-gray-600">
					{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : t("common.na")}
				</span>
			),
		},
		{
			key: "medicines",
			header: t("prescriptions.columns.medicines"),
			render: (p: IPrescription) => (
				<span className="text-sm text-gray-600">
					{p.medicinePrescriptions?.length || 0} {(p.medicinePrescriptions?.length || 0) === 1 ? t("prescriptions.item") : t("prescriptions.items")}
				</span>
			),
		},
		{
			key: "status",
			header: t("prescriptions.columns.status"),
			render: () => (
				<Badge variant={statusVariant["active"]} dot>
					{t("prescriptions.status.active")}
				</Badge>
			),
		},
		{
			key: "actions",
			header: "",
			render: (p: IPrescription) => (
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setViewRx(p);
						}}
						className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
					>
						<FaEye className="h-3.5 w-3.5" />
					</button>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setDeleteRx(p);
						}}
						className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
					>
						<FaTrash className="h-3.5 w-3.5" />
					</button>
				</div>
			),
		},
	];

	const filtered = prescriptions.filter(
		(p) =>
			(p.patient?.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
			p.id.toString().includes(search.toLowerCase()) ||
			p.diagnosis.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<Breadcrumb
				items={[
					{ label: t("common.dashboard"), href: "/" },
					{ label: t("prescriptions.title") },
				]}
			/>

			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						{t("prescriptions.title")}
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						{t("prescriptions.subtitle")}
					</p>
				</div>
				<Button
					onClick={() => {
						setSelectedMeds([{ medicineId: "", quantity: "1" }]);
						setCreateOpen(true);
					}}
					leftIcon={<FaPlus />}
				>
					{t("prescriptions.newPrescription")}
				</Button>
			</div>

			<Card className="overflow-hidden">
				<div className="p-4 border-b border-gray-100 bg-surface-primary">
					<div className="flex items-center gap-3 bg-surface-secondary px-3 py-2 rounded-xl w-full max-w-md border border-gray-100 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
						<FaSearch className="h-4 w-4 text-gray-400" />
						<input
							type="text"
							placeholder={t("prescriptions.searchPlaceholder")}
							className="bg-transparent border-none focus:ring-0 text-sm w-full p-0"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				<Table
					columns={columns}
					data={filtered}
					loading={isFetching}
					onRowClick={(row) => setViewRx(row)}
				/>
			</Card>

			{/* View Prescription */}
			{viewRx && (
				<Modal
					isOpen={!!viewRx}
					onClose={() => setViewRx(null)}
					title={`${t("prescriptions.modal.viewTitle")} RX${viewRx.id.toString().padStart(3, "0")}`}
					size="lg"
					footer={
						<Button variant="secondary" onClick={() => setViewRx(null)}>
							{t("common.close")}
						</Button>
					}
				>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-3">
							{[
								[t("prescriptions.modal.patient"), viewRx.patient?.user?.name || t("common.na")],
								[t("prescriptions.modal.doctor"), viewRx.doctor?.user?.name || t("common.na")],
								[t("prescriptions.modal.date"), viewRx.createdAt ? new Date(viewRx.createdAt).toLocaleDateString() : t("common.na")],
								[t("prescriptions.modal.diagnosis"), viewRx.diagnosis],
							].map(([k, v]) => (
								<div key={k} className="bg-surface-secondary rounded-xl p-3">
									<p className="text-xs text-gray-500">{k}</p>
									<p className="text-sm font-semibold text-gray-800 mt-0.5">
										{v}
									</p>
								</div>
							))}
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-700 mb-2">
								{t("prescriptions.modal.prescribedMedicines")}
							</p>
							<div className="space-y-2">
								{viewRx.medicinePrescriptions?.map((m, i) => (
									<div
										key={i}
										className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl"
									>
										<div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<FaNotesMedical className="h-3.5 w-3.5 text-primary-600" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-semibold text-gray-900">
												{m.medicine?.name || t("prescriptions.modal.unknownMedicine")}
											</p>
											<p className="text-xs text-gray-500">
												{t("prescriptions.modal.quantity")}: {m.quantity}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						{viewRx.notes && (
							<div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
								<p className="text-xs font-semibold text-amber-800 mb-1">
									{t("prescriptions.modal.doctorNotes")}
								</p>
								<p className="text-sm text-amber-700">{viewRx.notes}</p>
							</div>
						)}
					</div>
				</Modal>
			)}

			{/* Create Prescription */}
			<Modal
				isOpen={createOpen}
				onClose={() => setCreateOpen(false)}
				title={t("prescriptions.modal.addTitle")}
				size="xl"
				footer={
					<div className="flex gap-3">
						<Button variant="secondary" onClick={() => setCreateOpen(false)}>
							{t("common.cancel")}
						</Button>
						<Button onClick={handleCreate}>
							{t("prescriptions.modal.addBtn")}
						</Button>
					</div>
				}
			>
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
								{t("prescriptions.modal.patient")}
							</label>
							<select
								value={form.patientId}
								onChange={(e) => setForm({ ...form, patientId: e.target.value })}
								className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
							>
								<option value="">{t("prescriptions.modal.selectPatient")}</option>
								{patientMetadata.map((p) => (
									<option key={p.id} value={p.id}>
										{p.user.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
								{t("prescriptions.modal.doctor")}
							</label>
							<select
								value={form.doctorId}
								onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
								className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
							>
								<option value="">{t("prescriptions.modal.selectDoctor")}</option>
								{doctorMetadata.map((d) => (
									<option key={d.id} value={d.id}>
										{d.user.name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div>
						<label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
							{t("prescriptions.modal.diagnosis")}
						</label>
						<input
							type="text"
							value={form.diagnosis}
							onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
							placeholder={t("prescriptions.modal.diagnosisPlaceholder")}
							className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
						/>
					</div>

					<div>
						<div className="flex items-center justify-between mb-4">
							<p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
								<FaNotesMedical className="text-primary-500" />
								{t("prescriptions.modal.medicines")}
							</p>
							<Button
								variant="outline"
								size="sm"
								leftIcon={<FaPlus />}
								onClick={addMed}
							>
								{t("prescriptions.modal.addMed")}
							</Button>
						</div>

						{selectedMeds.map((m, i) => (
							<div
								key={i}
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3 p-4 bg-surface-secondary rounded-2xl border border-gray-100"
							>
								<div className="sm:col-span-2 lg:col-span-1">
									<label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
										{t("prescriptions.modal.medicine")}
									</label>
									<select
										value={m.medicineId}
										onChange={(e) => updateMed(i, "medicineId", e.target.value)}
										className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
									>
										<option value="">{t("prescriptions.modal.selectMed")}</option>
										{medicineMetadata.map((med) => (
											<option key={med.id} value={med.id}>
												{med.name}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
										{t("prescriptions.modal.quantity")}
									</label>
									<input
										type="number"
										value={m.quantity}
										onChange={(e) => updateMed(i, "quantity", e.target.value)}
										placeholder={t("prescriptions.modal.quantityPlaceholder")}
										className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
										min="1"
									/>
								</div>
								<div className="flex items-end">
									<Button
										variant="outline"
										size="sm"
										className="w-full text-rose-600 border-rose-100 hover:bg-rose-50"
										onClick={() => setSelectedMeds(sm => sm.filter((_, idx) => idx !== i))}
									>
										{t("common.remove")}
									</Button>
								</div>
							</div>
						))}
					</div>

					<div>
						<label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
							{t("prescriptions.modal.doctorNotes")} {t("common.optional")}
						</label>
						<textarea
							rows={3}
							value={form.notes}
							onChange={(e) => setForm({ ...form, notes: e.target.value })}
							placeholder={t("prescriptions.modal.notesPlaceholder")}
							className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm resize-none"
						/>
					</div>
				</div>
			</Modal>

			{/* Delete Confirmation */}
			{deleteRx && (
				<Modal
					isOpen={!!deleteRx}
					onClose={() => setDeleteRx(null)}
					title={t("patients.modal.deleteTitle")}
					size="sm"
					footer={
						<div className="flex gap-3">
							<Button variant="secondary" onClick={() => setDeleteRx(null)}>
								{t("common.cancel")}
							</Button>
							<Button
								variant="danger"
								onClick={() => handleDelete(deleteRx.id)}
							>
								{t("patients.modal.deleteBtn")}
							</Button>
						</div>
					}
				>
					<p className="text-sm text-gray-600">
						{t("common.confirmDelete")}
						<br />
						<span className="font-semibold text-gray-900 mt-2 block">
							RX{deleteRx.id.toString().padStart(3, "0")} - {deleteRx.patient?.user?.name}
						</span>
					</p>
				</Modal>
			)}
		</div>
	);
}
