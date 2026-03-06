import { useState } from "react";
import toast from "react-hot-toast";
import {
	FaChartBar,
	FaDownload,
	FaFileCsv,
	FaNotesMedical,
	FaUserInjured,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import Button from "../../components/ui/Button";
import {
	mockAppointments,
	mockPatients,
	mockPrescriptions,
} from "../../utils/mockData";

const monthlyData = [
	{ month: "Sep", patients: 145, prescriptions: 89, appointments: 120 },
	{ month: "Oct", patients: 178, prescriptions: 112, appointments: 155 },
	{ month: "Nov", patients: 162, prescriptions: 98, appointments: 140 },
	{ month: "Dec", patients: 195, prescriptions: 130, appointments: 175 },
	{ month: "Jan", patients: 220, prescriptions: 145, appointments: 198 },
	{ month: "Feb", patients: 248, prescriptions: 162, appointments: 220 },
	{ month: "Mar", patients: 267, prescriptions: 178, appointments: 242 },
];

export default function ReportsPage() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<"patients" | "prescriptions">(
		"patients",
	);

	function downloadCSV(data: Record<string, unknown>[], filename: string) {
		const headers = Object.keys(data[0]).join(",");
		const rows = data.map((r) =>
			Object.values(r)
				.map((v) => `"${v}"`)
				.join(","),
		);
		const csv = [headers, ...rows].join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename + ".csv";
		a.click();
		URL.revokeObjectURL(url);
		toast.success(`${filename} ${t("reports.toast.downloaded")}`);
	}

	const stats = [
		{
			label: t("reports.stats.totalPatients"),
			value: mockPatients.length,
			sub: `${mockPatients.filter((p) => p.status === "Active").length} ${t("reports.stats.active")}`,
			color: "bg-sky-50 text-sky-700 border-sky-200",
			icon: FaUserInjured,
		},
		{
			label: t("reports.stats.totalPrescriptions"),
			value: mockPrescriptions.length,
			sub: `${mockPrescriptions.filter((p) => p.status === "Active").length} ${t("reports.stats.active")}`,
			color: "bg-violet-50 text-violet-700 border-violet-200",
			icon: FaNotesMedical,
		},
		{
			label: t("reports.stats.totalAppointments"),
			value: mockAppointments.length,
			sub: `${mockAppointments.filter((a) => a.status === "Completed").length} ${t("reports.stats.completed")}`,
			color: "bg-emerald-50 text-emerald-700 border-emerald-200",
			icon: FaChartBar,
		},
		{
			label: t("reports.stats.completionRate"),
			value: `${Math.round((mockAppointments.filter((a) => a.status === "Completed").length / mockAppointments.length) * 100)}%`,
			sub: t("reports.stats.successRate"),
			color: "bg-amber-50 text-amber-700 border-amber-200",
			icon: FaChartBar,
		},
	];

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						{t("reports.title")}
					</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						{t("reports.subtitle")}
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() =>
							downloadCSV(
								mockPatients as unknown as Record<string, unknown>[],
								"patients_report",
							)
						}
						leftIcon={<FaFileCsv className="h-3.5 w-3.5" />}
					>
						{t("reports.exportPatients")}
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							downloadCSV(
								mockPrescriptions as unknown as Record<string, unknown>[],
								"prescriptions_report",
							)
						}
						leftIcon={<FaDownload className="h-3.5 w-3.5" />}
					>
						{t("reports.exportPrescriptions")}
					</Button>
				</div>
			</div>

			{/* Summary Stats */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map(({ label, value, sub, color, icon: Icon }) => (
					<div key={label} className={`${color} border rounded-2xl p-5`}>
						<Icon className="h-5 w-5 mb-3" />
						<p className="text-3xl font-bold">{value}</p>
						<p className="text-sm font-medium mt-1">{label}</p>
						<p className="text-xs opacity-70 mt-0.5">{sub}</p>
					</div>
				))}
			</div>

			{/* Combined Monthly Trend */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
				<div className="flex items-center justify-between mb-5">
					<div>
						<h2 className="text-base font-semibold text-gray-900">
							{t("reports.chart.title")}
						</h2>
						<p className="text-xs text-gray-500">
							{t("reports.chart.subtitle")}
						</p>
					</div>
				</div>
				<ResponsiveContainer width="100%" height={260}>
					<LineChart
						data={monthlyData}
						margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis
							dataKey="month"
							tick={{ fontSize: 11, fill: "#9ca3af" }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							tick={{ fontSize: 11, fill: "#9ca3af" }}
							axisLine={false}
							tickLine={false}
						/>
						<Tooltip
							contentStyle={{
								borderRadius: "12px",
								border: "1px solid #f0f0f0",
								fontSize: 12,
							}}
						/>
						<Legend wrapperStyle={{ fontSize: "12px" }} />
						<Line
							type="monotone"
							dataKey="patients"
							stroke="#0ea5e9"
							strokeWidth={2.5}
							dot={{ r: 4 }}
							activeDot={{ r: 6 }}
							name={t("reports.chart.patients")}
						/>
						<Line
							type="monotone"
							dataKey="prescriptions"
							stroke="#8b5cf6"
							strokeWidth={2.5}
							dot={{ r: 4 }}
							activeDot={{ r: 6 }}
							name={t("reports.chart.prescriptions")}
						/>
						<Line
							type="monotone"
							dataKey="appointments"
							stroke="#22c55e"
							strokeWidth={2.5}
							dot={{ r: 4 }}
							activeDot={{ r: 6 }}
							name={t("reports.chart.appointments")}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			{/* Tab Reports */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-card">
				<div className="flex border-b border-gray-100">
					{(
						[
							["patients", t("reports.tabs.patientReport"), FaUserInjured],
							["prescriptions", t("reports.tabs.prescriptionReport"), FaNotesMedical],
						] as const
					).map(([id, label, Icon]) => (
						<button
							key={id}
							onClick={() => setActiveTab(id as "patients" | "prescriptions")}
							className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === id ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
						>
							<Icon className="h-3.5 w-3.5" /> {label}
						</button>
					))}
				</div>

				{activeTab === "patients" && (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100">
									{[
										"ID",
										t("patients.columns.patient"),
										t("patients.modal.age"),
										t("patients.modal.gender"),
										t("patients.modal.bloodGroup"),
										t("patients.columns.status"),
										t("patients.view.registered"),
										t("patients.view.lastVisit"),
									].map((h) => (
										<th
											key={h}
											className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{mockPatients.slice(0, 8).map((p) => (
									<tr
										key={p.id}
										className="border-b border-gray-50 hover:bg-gray-50/50"
									>
										<td className="px-4 py-3 font-mono text-xs text-gray-500">
											{p.id}
										</td>
										<td className="px-4 py-3 font-semibold text-gray-900">
											{p.name}
										</td>
										<td className="px-4 py-3 text-gray-600">{p.age}</td>
										<td className="px-4 py-3 text-gray-600">{p.gender}</td>
										<td className="px-4 py-3 font-mono text-xs font-semibold text-rose-600">
											{p.bloodGroup}
										</td>
										<td className="px-4 py-3">
											<span
												className={`text-xs font-medium px-2 py-1 rounded-full ${p.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}
											>
												{p.status}
											</span>
										</td>
										<td className="px-4 py-3 text-gray-500 text-xs">
											{p.registeredDate}
										</td>
										<td className="px-4 py-3 text-gray-500 text-xs">
											{p.lastVisit || "—"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{activeTab === "prescriptions" && (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100">
									{[
										t("prescriptions.columns.rxId"),
										t("prescriptions.columns.patient"),
										t("prescriptions.columns.doctor"),
										t("prescriptions.columns.date"),
										t("prescriptions.columns.diagnosis"),
										t("prescriptions.columns.medicines"),
										t("prescriptions.columns.status"),
									].map((h) => (
										<th
											key={h}
											className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{mockPrescriptions.map((p) => (
									<tr
										key={p.id}
										className="border-b border-gray-50 hover:bg-gray-50/50"
									>
										<td className="px-4 py-3 font-mono text-xs font-semibold text-primary-600">
											{p.id}
										</td>
										<td className="px-4 py-3 font-semibold text-gray-900">
											{p.patientName}
										</td>
										<td className="px-4 py-3 text-gray-600">{p.doctorName}</td>
										<td className="px-4 py-3 text-gray-500 text-xs">
											{p.date}
										</td>
										<td className="px-4 py-3 text-gray-700">{p.diagnosis}</td>
										<td className="px-4 py-3 text-gray-600">
											{p.medicines.length}
										</td>
										<td className="px-4 py-3">
											<span
												className={`text-xs font-medium px-2 py-1 rounded-full ${p.status === "Active" ? "bg-emerald-50 text-emerald-700" : p.status === "Completed" ? "bg-sky-50 text-sky-700" : "bg-rose-50 text-rose-700"}`}
											>
												{p.status}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
