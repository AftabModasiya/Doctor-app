import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import {
	FaCalendarCheck,
	FaCheckCircle,
	FaClock,
	FaPlus,
	FaSearch,
	FaTimes,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Table from "../../components/ui/Table";
import type { Appointment } from "../../types";
import {
	mockAppointments,
	mockDoctors,
	mockPatients,
} from "../../utils/mockData";

const statusVariant: Record<string, "success" | "warning" | "info" | "danger"> =
	{
		Confirmed: "success",
		Pending: "warning",
		Completed: "info",
		Cancelled: "danger",
	};

export default function AppointmentsPage() {
	const { t } = useTranslation();
	const [appointments, setAppointments] =
		useState<Appointment[]>(mockAppointments);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<string>("All");
	const [bookOpen, setBookOpen] = useState(false);
	const [form, setForm] = useState({
		patientId: "",
		doctorId: "",
		date: "",
		time: "",
		type: "Consultation" as Appointment["type"],
		notes: "",
	});

	const filtered = appointments.filter((a) => {
		const matchSearch =
			a.patientName.toLowerCase().includes(search.toLowerCase()) ||
			a.id.toLowerCase().includes(search.toLowerCase());
		const matchStatus = filter === "All" || a.status === filter;
		return matchSearch && matchStatus;
	});

	const updateStatus = (id: string, status: Appointment["status"]) => {
		setAppointments((as) =>
			as.map((a) => (a.id === id ? { ...a, status } : a)),
		);
		toast.success(`${t("appointments.title")} ${status.toLowerCase()}`);
	};

	const handleBook = () => {
		if (!form.patientId || !form.doctorId || !form.date || !form.time) {
			toast.error(t("appointments.toast.fillRequired"));
			return;
		}
		const patient = mockPatients.find((p) => p.id === form.patientId);
		const doctor = mockDoctors.find((d) => d.id === form.doctorId);
		const newAppt: Appointment = {
			id: `APT${(appointments.length + 1).toString().padStart(3, "0")}`,
			...form,
			patientName: patient?.name || "",
			doctorName: doctor?.name || "",
			status: "Pending",
		};
		setAppointments((as) => [newAppt, ...as]);
		toast.success(t("appointments.toast.booked"));
		setBookOpen(false);
	};

	const columns = [
		{
			key: "id",
			header: t("appointments.columns.id"),
			render: (a: Appointment) => (
				<span className="font-mono text-xs text-gray-500">{a.id}</span>
			),
		},
		{
			key: "patientName",
			header: t("appointments.columns.patient"),
			render: (a: Appointment) => (
				<div className="flex items-center gap-2">
					<div className="h-7 w-7 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
						{a.patientName
							.split(" ")
							.map((n) => n[0])
							.slice(0, 2)
							.join("")}
					</div>
					<span className="text-sm font-medium text-gray-900">
						{a.patientName}
					</span>
				</div>
			),
		},
		{
			key: "doctorName",
			header: t("appointments.columns.doctor"),
			render: (a: Appointment) => (
				<span className="text-sm text-gray-700">{a.doctorName}</span>
			),
		},
		{
			key: "date",
			header: t("appointments.columns.dateTime"),
			render: (a: Appointment) => (
				<div>
					<p className="text-sm font-medium text-gray-900">
						{dayjs(a.date).format("D MMM YYYY")}
					</p>
					<p className="text-xs text-gray-400">{a.time}</p>
				</div>
			),
		},
		{
			key: "type",
			header: t("appointments.columns.type"),
			render: (a: Appointment) => <Badge variant="neutral">{a.type}</Badge>,
		},
		{
			key: "status",
			header: t("appointments.columns.status"),
			render: (a: Appointment) => (
				<Badge variant={statusVariant[a.status]} dot>
					{a.status}
				</Badge>
			),
		},
		{
			key: "actions",
			header: t("appointments.columns.actions"),
			render: (a: Appointment) => (
				<div className="flex items-center gap-1">
					{a.status === "Pending" && (
						<button
							onClick={() => updateStatus(a.id, "Confirmed")}
							className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
							title={t("appointments.confirmed")}
						>
							<FaCheckCircle className="h-3.5 w-3.5" />
						</button>
					)}
					{a.status === "Confirmed" && (
						<button
							onClick={() => updateStatus(a.id, "Completed")}
							className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
							title={t("appointments.completed")}
						>
							<FaCheckCircle className="h-3.5 w-3.5" />
						</button>
					)}
					{(a.status === "Pending" || a.status === "Confirmed") && (
						<button
							onClick={() => updateStatus(a.id, "Cancelled")}
							className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
							title={t("appointments.cancelled")}
						>
							<FaTimes className="h-3.5 w-3.5" />
						</button>
					)}
				</div>
			),
		},
	];

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{t("appointments.title")}</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						{appointments.length} {t("appointments.totalCount")}
					</p>
				</div>
				<Button
					onClick={() => setBookOpen(true)}
					leftIcon={<FaPlus className="h-3.5 w-3.5" />}
				>
					{t("appointments.bookAppointment")}
				</Button>
			</div>

			{/* Status Summary */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
				{[
					{
						label: t("appointments.pending"),
						count: appointments.filter((a) => a.status === "Pending").length,
						icon: FaClock,
						color: "bg-amber-50 text-amber-700 border-amber-200",
					},
					{
						label: t("appointments.confirmed"),
						count: appointments.filter((a) => a.status === "Confirmed").length,
						icon: FaCalendarCheck,
						color: "bg-sky-50 text-sky-700 border-sky-200",
					},
					{
						label: t("appointments.completed"),
						count: appointments.filter((a) => a.status === "Completed").length,
						icon: FaCheckCircle,
						color: "bg-emerald-50 text-emerald-700 border-emerald-200",
					},
					{
						label: t("appointments.cancelled"),
						count: appointments.filter((a) => a.status === "Cancelled").length,
						icon: FaTimes,
						color: "bg-rose-50 text-rose-700 border-rose-200",
					},
				].map(({ label, count, icon: Icon, color }) => (
					<div
						key={label}
						className={`${color} border rounded-2xl p-4 flex items-center gap-3`}
					>
						<Icon className="h-5 w-5 flex-shrink-0" />
						<div>
							<p className="text-2xl font-bold">{count}</p>
							<p className="text-xs font-medium">{label}</p>
						</div>
					</div>
				))}
			</div>

			<div className="bg-white rounded-2xl border border-gray-100 shadow-card">
				<div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
					<div className="relative flex-1 max-w-sm">
						<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={t("appointments.searchPlaceholder")}
							className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div className="flex gap-2">
						{[
							{ label: t("appointments.all"), value: "All" },
							{ label: t("appointments.pending"), value: "Pending" },
							{ label: t("appointments.confirmed"), value: "Confirmed" },
							{ label: t("appointments.completed"), value: "Completed" },
							{ label: t("appointments.cancelled"), value: "Cancelled" },
						].map((s) => (
							<button
								key={s.value}
								onClick={() => setFilter(s.value)}
								className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filter === s.value ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
							>
								{s.label}
							</button>
						))}
					</div>
				</div>
				<Table
					columns={columns}
					data={filtered}
					emptyMessage={t("appointments.noAppointments")}
					emptyIcon={<FaCalendarCheck />}
				/>
			</div>

			<Modal
				isOpen={bookOpen}
				onClose={() => setBookOpen(false)}
				title={t("appointments.modal.title")}
				size="md"
				footer={
					<>
						<Button variant="secondary" onClick={() => setBookOpen(false)}>
							{t("common.cancel")}
						</Button>
						<Button onClick={handleBook}>{t("appointments.modal.bookBtn")}</Button>
					</>
				}
			>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("appointments.modal.patient")} <span className="text-rose-500">*</span>
						</label>
						<select
							value={form.patientId}
							onChange={(e) =>
								setForm((f) => ({ ...f, patientId: e.target.value }))
							}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							<option value="">{t("appointments.modal.selectPatient")}</option>
							{mockPatients.map((p) => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("appointments.modal.doctor")} <span className="text-rose-500">*</span>
						</label>
						<select
							value={form.doctorId}
							onChange={(e) =>
								setForm((f) => ({ ...f, doctorId: e.target.value }))
							}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							<option value="">{t("appointments.modal.selectDoctor")}</option>
							{mockDoctors.map((d) => (
								<option key={d.id} value={d.id}>
									{d.name}
								</option>
							))}
						</select>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								{t("appointments.modal.date")} <span className="text-rose-500">*</span>
							</label>
							<input
								type="date"
								value={form.date}
								onChange={(e) =>
									setForm((f) => ({ ...f, date: e.target.value }))
								}
								className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								{t("appointments.modal.time")} <span className="text-rose-500">*</span>
							</label>
							<input
								type="time"
								value={form.time}
								onChange={(e) =>
									setForm((f) => ({ ...f, time: e.target.value }))
								}
								className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("appointments.modal.type")}
						</label>
						<select
							value={form.type}
							onChange={(e) =>
								setForm((f) => ({
									...f,
									type: e.target.value as Appointment["type"],
								}))
							}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							{["New Patient", "Follow-up", "Consultation", "Emergency"].map(
								(t) => (
									<option key={t} value={t}>
										{t}
									</option>
								),
							)}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							{t("appointments.modal.notes")}
						</label>
						<textarea
							value={form.notes}
							onChange={(e) =>
								setForm((f) => ({ ...f, notes: e.target.value }))
							}
							rows={2}
							placeholder={t("appointments.modal.notesPlaceholder")}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
}
