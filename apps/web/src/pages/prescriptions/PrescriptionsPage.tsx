import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaNotesMedical, FaPlus, FaSearch } from 'react-icons/fa';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Table from '../../components/ui/Table';
import type { Prescription, PrescriptionMedicine } from '../../types';
import {
	mockDoctors,
	mockMedicines,
	mockPatients,
	mockPrescriptions,
} from '../../utils/mockData';

const statusVariant: Record<string, 'success' | 'info' | 'danger'> = {
	Active: 'success',
	Completed: 'info',
	Cancelled: 'danger',
};

export default function PrescriptionsPage() {
	const [prescriptions, setPrescriptions] =
		useState<Prescription[]>(mockPrescriptions);
	const [search, setSearch] = useState('');
	const [viewRx, setViewRx] = useState<Prescription | null>(null);
	const [createOpen, setCreateOpen] = useState(false);
	const [selectedMeds, setSelectedMeds] = useState<PrescriptionMedicine[]>([]);
	const [form, setForm] = useState({
		patientId: '',
		doctorId: '',
		diagnosis: '',
		notes: '',
	});

	const filtered = prescriptions.filter(
		(p) =>
			p.patientName.toLowerCase().includes(search.toLowerCase()) ||
			p.id.toLowerCase().includes(search.toLowerCase()) ||
			p.diagnosis.toLowerCase().includes(search.toLowerCase()),
	);

	const addMed = () =>
		setSelectedMeds((sm) => [
			...sm,
			{
				medicineId: '',
				medicineName: '',
				dosage: '',
				frequency: '',
				duration: '',
			},
		]);
	const updateMed = (
		i: number,
		field: keyof PrescriptionMedicine,
		val: string,
	) => {
		setSelectedMeds((sm) =>
			sm.map((m, idx) => {
				if (idx !== i) return m;
				if (field === 'medicineId') {
					const med = mockMedicines.find((x) => x.id === val);
					return { ...m, medicineId: val, medicineName: med?.name || '' };
				}
				return { ...m, [field]: val };
			}),
		);
	};

	const handleCreate = () => {
		if (!form.patientId || !form.doctorId || !form.diagnosis) {
			toast.error('Please fill required fields');
			return;
		}
		const patient = mockPatients.find((p) => p.id === form.patientId);
		const doctor = mockDoctors.find((d) => d.id === form.doctorId);
		const newRx: Prescription = {
			id: `RX${(prescriptions.length + 1).toString().padStart(3, '0')}`,
			patientId: form.patientId,
			patientName: patient?.name || '',
			doctorId: form.doctorId,
			doctorName: doctor?.name || '',
			date: new Date().toISOString().split('T')[0],
			diagnosis: form.diagnosis,
			medicines: selectedMeds,
			notes: form.notes,
			status: 'Active',
		};
		setPrescriptions((ps) => [newRx, ...ps]);
		toast.success('Prescription created');
		setCreateOpen(false);
		setForm({ patientId: '', doctorId: '', diagnosis: '', notes: '' });
		setSelectedMeds([]);
	};

	const columns = [
		{
			key: 'id',
			header: 'Rx ID',
			render: (p: Prescription) => (
				<span className="font-mono text-xs font-semibold text-primary-600">
					{p.id}
				</span>
			),
		},
		{
			key: 'patientName',
			header: 'Patient',
			render: (p: Prescription) => (
				<div>
					<p className="text-sm font-semibold text-gray-900">{p.patientName}</p>
					<p className="text-xs text-gray-400">{p.patientId}</p>
				</div>
			),
		},
		{
			key: 'doctorName',
			header: 'Doctor',
			render: (p: Prescription) => (
				<span className="text-sm text-gray-700">{p.doctorName}</span>
			),
		},
		{
			key: 'diagnosis',
			header: 'Diagnosis',
			render: (p: Prescription) => (
				<span className="text-sm text-gray-700">{p.diagnosis}</span>
			),
		},
		{
			key: 'date',
			header: 'Date',
			render: (p: Prescription) => (
				<span className="text-sm text-gray-600">{p.date}</span>
			),
		},
		{
			key: 'medicines',
			header: 'Medicines',
			render: (p: Prescription) => (
				<span className="text-sm text-gray-600">
					{p.medicines.length} item{p.medicines.length !== 1 ? 's' : ''}
				</span>
			),
		},
		{
			key: 'status',
			header: 'Status',
			render: (p: Prescription) => (
				<Badge variant={statusVariant[p.status]} dot>
					{p.status}
				</Badge>
			),
		},
		{
			key: 'actions',
			header: '',
			render: (p: Prescription) => (
				<button
					onClick={() => setViewRx(p)}
					className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
				>
					<FaEye className="h-3.5 w-3.5" />
				</button>
			),
		},
	];

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						{prescriptions.length} total prescriptions
					</p>
				</div>
				<Button
					onClick={() => setCreateOpen(true)}
					leftIcon={<FaPlus className="h-3.5 w-3.5" />}
				>
					New Prescription
				</Button>
			</div>

			<div className="bg-white rounded-2xl border border-gray-100 shadow-card">
				<div className="p-4 border-b border-gray-100">
					<div className="relative max-w-sm">
						<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search prescriptions…"
							className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>
				<Table
					columns={columns}
					data={filtered}
					emptyMessage="No prescriptions found"
					emptyIcon={<FaNotesMedical />}
				/>
			</div>

			{/* View Prescription */}
			{viewRx && (
				<Modal
					isOpen={!!viewRx}
					onClose={() => setViewRx(null)}
					title={`Prescription ${viewRx.id}`}
					size="lg"
					footer={
						<Button variant="secondary" onClick={() => setViewRx(null)}>
							Close
						</Button>
					}
				>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-3">
							{[
								['Patient', viewRx.patientName],
								['Doctor', viewRx.doctorName],
								['Date', viewRx.date],
								['Diagnosis', viewRx.diagnosis],
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
								Prescribed Medicines
							</p>
							<div className="space-y-2">
								{viewRx.medicines.map((m, i) => (
									<div
										key={i}
										className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl"
									>
										<div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<FaNotesMedical className="h-3.5 w-3.5 text-primary-600" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-semibold text-gray-900">
												{m.medicineName}
											</p>
											<p className="text-xs text-gray-500">
												{m.dosage} · {m.frequency} · {m.duration}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						{viewRx.notes && (
							<div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
								<p className="text-xs font-semibold text-amber-800 mb-1">
									Doctor's Notes
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
				title="New Prescription"
				size="lg"
				footer={
					<>
						<Button variant="secondary" onClick={() => setCreateOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleCreate}>Create Prescription</Button>
					</>
				}
			>
				<div className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Patient <span className="text-rose-500">*</span>
							</label>
							<select
								value={form.patientId}
								onChange={(e) =>
									setForm((f) => ({ ...f, patientId: e.target.value }))
								}
								className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<option value="">Select patient…</option>
								{mockPatients.map((p) => (
									<option key={p.id} value={p.id}>
										{p.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Doctor <span className="text-rose-500">*</span>
							</label>
							<select
								value={form.doctorId}
								onChange={(e) =>
									setForm((f) => ({ ...f, doctorId: e.target.value }))
								}
								className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<option value="">Select doctor…</option>
								{mockDoctors.map((d) => (
									<option key={d.id} value={d.id}>
										{d.name}
									</option>
								))}
							</select>
						</div>
						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Diagnosis <span className="text-rose-500">*</span>
							</label>
							<input
								value={form.diagnosis}
								onChange={(e) =>
									setForm((f) => ({ ...f, diagnosis: e.target.value }))
								}
								placeholder="e.g. Viral Fever"
								className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between mb-2">
							<p className="text-sm font-semibold text-gray-700">Medicines</p>
							<Button
								size="sm"
								variant="outline"
								onClick={addMed}
								leftIcon={<FaPlus className="h-3 w-3" />}
							>
								Add Medicine
							</Button>
						</div>
						{selectedMeds.map((m, i) => (
							<div
								key={i}
								className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2 p-3 bg-surface-secondary rounded-xl"
							>
								<div className="col-span-2">
									<select
										value={m.medicineId}
										onChange={(e) => updateMed(i, 'medicineId', e.target.value)}
										className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
									>
										<option value="">Select medicine…</option>
										{mockMedicines.map((med) => (
											<option key={med.id} value={med.id}>
												{med.name}
											</option>
										))}
									</select>
								</div>
								<input
									value={m.dosage}
									onChange={(e) => updateMed(i, 'dosage', e.target.value)}
									placeholder="Dosage"
									className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
								/>
								<input
									value={m.frequency}
									onChange={(e) => updateMed(i, 'frequency', e.target.value)}
									placeholder="Frequency"
									className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
								/>
								<input
									value={m.duration}
									onChange={(e) => updateMed(i, 'duration', e.target.value)}
									placeholder="Duration (e.g. 7 days)"
									className="col-span-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
								/>
							</div>
						))}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Notes
						</label>
						<textarea
							value={form.notes}
							onChange={(e) =>
								setForm((f) => ({ ...f, notes: e.target.value }))
							}
							rows={3}
							placeholder="Additional instructions…"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
}
