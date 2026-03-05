import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaPlus, FaSearch, FaStar, FaTrash } from 'react-icons/fa';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import type { Doctor } from '../../types';
import { mockDoctors } from '../../utils/mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SPECIALIZATIONS = [
	'Cardiologist',
	'Neurologist',
	'Pediatrician',
	'Orthopedic',
	'Dermatologist',
	'General Physician',
	'Gynecologist',
	'Ophthalmologist',
	'Psychiatrist',
	'Radiologist',
];

const statusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
	Active: 'success',
	'On Leave': 'warning',
	Inactive: 'neutral',
};

export default function DoctorsPage() {
	const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [editDoc, setEditDoc] = useState<Doctor | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<Doctor | null>(null);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const { register, handleSubmit, reset, setValue } = useForm<Doctor>();

	const filtered = doctors.filter(
		(d) =>
			d.name.toLowerCase().includes(search.toLowerCase()) ||
			d.specialization.toLowerCase().includes(search.toLowerCase()),
	);

	const openAdd = () => {
		setEditDoc(null);
		setSelectedDays([]);
		reset();
		setModalOpen(true);
	};
	const openEdit = (d: Doctor) => {
		setEditDoc(d);
		setSelectedDays(d.availability);
		(Object.keys(d) as (keyof Doctor)[]).forEach((k) =>
			setValue(k, d[k] as string & number & string[]),
		);
		setModalOpen(true);
	};

	const toggleDay = (day: string) =>
		setSelectedDays((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
		);

	const onSubmit = (data: Doctor) => {
		const docData = { ...data, availability: selectedDays };
		if (editDoc) {
			setDoctors((ds) =>
				ds.map((d) => (d.id === editDoc.id ? { ...d, ...docData } : d)),
			);
			toast.success('Doctor updated');
		} else {
			setDoctors((ds) => [
				{
					...docData,
					id: `D${(ds.length + 1).toString().padStart(3, '0')}`,
					patients: 0,
					rating: 4.5,
				},
				...ds,
			]);
			toast.success('Doctor added');
		}
		setModalOpen(false);
	};

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						{doctors.length} doctors on staff
					</p>
				</div>
				<Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
					Add Doctor
				</Button>
			</div>

			{/* Search */}
			<div className="relative max-w-sm">
				<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search by name or specialization…"
					className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
				/>
			</div>

			{/* Doctor Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				{filtered.map((doc) => (
					<div
						key={doc.id}
						className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 card-hover"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
									{doc.name
										.replace('Dr. ', '')
										.split(' ')
										.map((n) => n[0])
										.slice(0, 2)
										.join('')}
								</div>
								<div>
									<p className="text-sm font-bold text-gray-900">{doc.name}</p>
									<p className="text-xs text-primary-600 font-medium">
										{doc.specialization}
									</p>
								</div>
							</div>
							<Badge variant={statusVariant[doc.status]} dot>
								{doc.status}
							</Badge>
						</div>

						<div className="grid grid-cols-2 gap-2 mb-4">
							<div className="bg-surface-secondary rounded-xl p-2.5">
								<p className="text-xs text-gray-500">Experience</p>
								<p className="text-sm font-semibold text-gray-800">
									{doc.experience} yrs
								</p>
							</div>
							<div className="bg-surface-secondary rounded-xl p-2.5">
								<p className="text-xs text-gray-500">Fee</p>
								<p className="text-sm font-semibold text-gray-800">
									${doc.consultationFee}
								</p>
							</div>
							<div className="bg-surface-secondary rounded-xl p-2.5">
								<p className="text-xs text-gray-500">Patients</p>
								<p className="text-sm font-semibold text-gray-800">
									{doc.patients}
								</p>
							</div>
							<div className="bg-surface-secondary rounded-xl p-2.5">
								<div className="flex items-center gap-1">
									<FaStar className="h-3 w-3 text-amber-400" />
									<p className="text-sm font-semibold text-gray-800">
										{doc.rating}
									</p>
								</div>
								<p className="text-xs text-gray-500">Rating</p>
							</div>
						</div>

						<div className="mb-4">
							<p className="text-xs text-gray-500 mb-1.5">Available Days</p>
							<div className="flex gap-1 flex-wrap">
								{DAYS.map((day) => (
									<span
										key={day}
										className={`text-xs px-2 py-0.5 rounded-lg font-medium ${doc.availability.includes(day) ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-400'}`}
									>
										{day}
									</span>
								))}
							</div>
						</div>

						<div className="flex gap-2 pt-3 border-t border-gray-100">
							<Button
								size="sm"
								variant="outline"
								className="flex-1"
								onClick={() => openEdit(doc)}
								leftIcon={<FaEdit className="h-3 w-3" />}
							>
								Edit
							</Button>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => setDeleteConfirm(doc)}
							>
								<FaTrash className="h-3.5 w-3.5 text-rose-400" />
							</Button>
						</div>
					</div>
				))}
			</div>

			{/* Add/Edit Modal */}
			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				title={editDoc ? 'Edit Doctor' : 'Add Doctor'}
				size="lg"
				footer={
					<>
						<Button variant="secondary" onClick={() => setModalOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit(onSubmit)}>
							{editDoc ? 'Save' : 'Add Doctor'}
						</Button>
					</>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="sm:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Full Name
						</label>
						<input
							{...register('name')}
							placeholder="Dr. Jane Smith"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Specialization
						</label>
						<select
							{...register('specialization')}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							{SPECIALIZATIONS.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Qualification
						</label>
						<input
							{...register('qualification')}
							placeholder="MD, FACC"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Email
						</label>
						<input
							{...register('email')}
							type="email"
							placeholder="doctor@mediadmin.com"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Phone
						</label>
						<input
							{...register('phone')}
							placeholder="+1 555-0200"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Experience (years)
						</label>
						<input
							{...register('experience')}
							type="number"
							placeholder="10"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Consultation Fee ($)
						</label>
						<input
							{...register('consultationFee')}
							type="number"
							placeholder="200"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Status
						</label>
						<select
							{...register('status')}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							<option value="Active">Active</option>
							<option value="On Leave">On Leave</option>
							<option value="Inactive">Inactive</option>
						</select>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Availability
						</label>
						<div className="flex gap-2 flex-wrap">
							{DAYS.map((day) => (
								<button
									key={day}
									type="button"
									onClick={() => toggleDay(day)}
									className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${selectedDays.includes(day) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'}`}
								>
									{day}
								</button>
							))}
						</div>
					</div>
				</div>
			</Modal>

			{/* Delete Confirm */}
			{deleteConfirm && (
				<Modal
					isOpen={!!deleteConfirm}
					onClose={() => setDeleteConfirm(null)}
					title="Remove Doctor"
					size="sm"
					footer={
						<>
							<Button
								variant="secondary"
								onClick={() => setDeleteConfirm(null)}
							>
								Cancel
							</Button>
							<Button
								variant="danger"
								onClick={() => {
									setDoctors((ds) =>
										ds.filter((d) => d.id !== deleteConfirm.id),
									);
									setDeleteConfirm(null);
									toast.success('Doctor removed');
								}}
							>
								Remove
							</Button>
						</>
					}
				>
					<p className="text-sm text-gray-600">
						Remove <strong>{deleteConfirm.name}</strong> from the system?
					</p>
				</Modal>
			)}
		</div>
	);
}
