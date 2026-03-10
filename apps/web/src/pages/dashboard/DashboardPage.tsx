import type React from "react";
import {
	FaArrowUp,
	FaCalendarAlt,
	FaExclamationTriangle,
	FaNotesMedical,
	FaUserInjured,
	FaUserMd,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Badge from "../../components/ui/Badge";
import {
	chartData as chartDataMock,
	mockActivity,
	mockAppointments,
} from "../../utils/mockData";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { 
    getDashboardCountsAsyncThunk, 
    getPatientChartAsyncThunk 
} from "@store/dashboard/dashboard-async-thunk";

const activityIcons: Record<string, React.ReactNode> = {
	calendar: <FaCalendarAlt className="h-3.5 w-3.5" />,
	patient: <FaUserInjured className="h-3.5 w-3.5" />,
	prescription: <FaNotesMedical className="h-3.5 w-3.5" />,
	medicine: <FaExclamationTriangle className="h-3.5 w-3.5" />,
	doctor: <FaUserMd className="h-3.5 w-3.5" />,
};

const activityColors: Record<string, string> = {
	calendar: "bg-sky-100 text-sky-600",
	patient: "bg-emerald-100 text-emerald-600",
	prescription: "bg-violet-100 text-violet-600",
	medicine: "bg-amber-100 text-amber-600",
	doctor: "bg-rose-100 text-rose-600",
};

const appointmentStatusVariant: Record<
	string,
	"success" | "warning" | "info" | "danger" | "neutral"
> = {
	Confirmed: "success",
	Pending: "warning",
	Completed: "info",
	Cancelled: "danger",
};

export default function DashboardPage() {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { counts, chartData, loading, chartLoading } = useAppSelector((state) => state.dashboard);
	
	useEffect(() => {
		dispatch(getDashboardCountsAsyncThunk());
		
		const currentYear = new Date().getFullYear();
		dispatch(getPatientChartAsyncThunk({
			startDate: `${currentYear}-01-01`,
			endDate: `${currentYear}-12-31`
		}));
	}, [dispatch]);

	const formattedChartData = useMemo(() => {
		if (!chartData) return [];
		return chartData.labels.map((label, index) => ({
			month: label,
			patients: chartData.data[index],
		}));
	}, [chartData]);

	const todayAppts = mockAppointments.filter((a) => a.date === "2025-03-05");

	const stats = [
		{
			label: t("dashboard.totalPatients"),
			value: loading ? "..." : String(counts?.totalPatientCount ?? 0),
			icon: FaUserInjured,
			color: "bg-sky-50 text-sky-600",
			trend: "up",
		},
		{
			label: t("dashboard.totalDoctors"),
			value: loading ? "..." : String(counts?.totalDoctorCount ?? 0),
			icon: FaUserMd,
			color: "bg-violet-50 text-violet-600",
			trend: "neutral",
		},
		{
			label: t("dashboard.prescriptions"),
			value: loading ? "..." : String(counts?.prescriptionDoctorCount ?? 0),
			icon: FaNotesMedical,
			color: "bg-emerald-50 text-emerald-600",
			trend: "up",
		},
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold text-gray-900">{t("dashboard.title")}</h1>
				<p className="text-sm text-gray-500 mt-0.5">
					{t("dashboard.subtitle")}
				</p>
			</div>

			{/* Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
				{stats.map(({ label, value, icon: Icon, color, trend }) => (
					<div
						key={label}
						className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 card-hover animate-fade-in"
					>
						<div className="flex items-start justify-between mb-4">
							<div
								className={`h-10 w-10 rounded-xl flex items-center justify-center ${color}`}
							>
								<Icon className="h-5 w-5" />
							</div>
							{trend === "up" && (
								<span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">
									<FaArrowUp className="h-2.5 w-2.5" /> {t("dashboard.up")}
								</span>
							)}
						</div>
						<p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
						<p className="text-sm font-medium text-gray-600">{label}</p>
					</div>
				))}
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Patient Growth */}
				<div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
					<div className="flex items-center justify-between mb-5">
						<div>
							<h2 className="text-base font-semibold text-gray-900">
								{t("dashboard.patientGrowth")}
							</h2>
							<p className="text-xs text-gray-500 mt-0.5">{t("dashboard.last7Months")}</p>
						</div>
						
					</div>
					<div className="relative">
						{chartLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
							</div>
						)}
						<ResponsiveContainer width="100%" height={220}>
							<AreaChart
								data={formattedChartData.length > 0 ? formattedChartData : chartDataMock.patientsGrowth}
								margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
							>
								<defs>
									<linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15} />
										<stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
									</linearGradient>
								</defs>
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
								<Area
									type="monotone"
									dataKey="patients"
									stroke="#0ea5e9"
									strokeWidth={2.5}
									fill="url(#patientGrad)"
									dot={{ fill: "#0ea5e9", r: 4 }}
									activeDot={{ r: 6 }}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Appointment Distribution */}
				<div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
					<h2 className="text-base font-semibold text-gray-900 mb-1">
						{t("dashboard.appointments")}
					</h2>
					<p className="text-xs text-gray-500 mb-5">{t("dashboard.statusBreakdown")}</p>
					<ResponsiveContainer width="100%" height={160}>
						<PieChart>
							<Pie
								data={chartDataMock.appointmentsByStatus}
								cx="50%"
								cy="50%"
								innerRadius={50}
								outerRadius={70}
								paddingAngle={3}
								dataKey="value"
							>
								{chartDataMock.appointmentsByStatus.map((entry, i) => (
									<Cell key={i} fill={entry.color} />
								))}
							</Pie>
							<Tooltip contentStyle={{ borderRadius: "10px", fontSize: 12 }} />
						</PieChart>
					</ResponsiveContainer>
					<div className="space-y-2 mt-2">
						{chartDataMock.appointmentsByStatus.map((item) => (
							<div
								key={item.name}
								className="flex items-center justify-between text-xs"
							>
								<div className="flex items-center gap-2">
									<span
										className="h-2.5 w-2.5 rounded-full"
										style={{ backgroundColor: item.color }}
									/>
									<span className="text-gray-600">{item.name}</span>
								</div>
								<span className="font-semibold text-gray-800">
									{item.value}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Weekly Appointments & Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Weekly Bar Chart */}
				<div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
					<h2 className="text-base font-semibold text-gray-900 mb-1">
						{t("dashboard.weeklyAppointments")}
					</h2>
					<p className="text-xs text-gray-500 mb-5">
						{t("dashboard.weeklyVolume")}
					</p>
					<ResponsiveContainer width="100%" height={180}>
						<BarChart
							data={chartDataMock.weeklyAppointments}
							margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
						>
							<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
							<XAxis
								dataKey="day"
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
								cursor={{ fill: "#f0f9ff" }}
							/>
							<Bar
								dataKey="appointments"
								fill="#0ea5e9"
								radius={[6, 6, 0, 0]}
								maxBarSize={40}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Today's Appointments */}
				<div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
					<h2 className="text-base font-semibold text-gray-900 mb-1">
						{t("dashboard.todaySchedule")}
					</h2>
					<p className="text-xs text-gray-500 mb-4">
						{todayAppts.length} {t("nav.appointments").toLowerCase()}
					</p>
					<div className="space-y-3">
						{todayAppts.map((appt) => (
							<div
								key={appt.id}
								className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary"
							>
								<div className="h-8 w-8 flex-shrink-0 bg-primary-100 rounded-lg flex items-center justify-center">
									<FaCalendarAlt className="h-3.5 w-3.5 text-primary-600" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-semibold text-gray-900 truncate">
										{appt.patientName}
									</p>
									<p className="text-xs text-gray-500 truncate">
										{appt.doctorName}
									</p>
									<p className="text-xs text-gray-400">{appt.time}</p>
								</div>
								<Badge variant={appointmentStatusVariant[appt.status]}>
									{appt.status}
								</Badge>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
				<div className="mb-5">
					<h2 className="text-base font-semibold text-gray-900">
						{t("dashboard.recentActivity")}
					</h2>
					<p className="text-xs text-gray-500 mt-0.5">
						{t("dashboard.latestActions")}
					</p>
				</div>
				<div className="space-y-3">
					{mockActivity.map((item) => (
						<div
							key={item.id}
							className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
						>
							<div
								className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activityColors[item.icon] || "bg-gray-100 text-gray-500"}`}
							>
								{activityIcons[item.icon]}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm text-gray-700">{item.message}</p>
								<p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
