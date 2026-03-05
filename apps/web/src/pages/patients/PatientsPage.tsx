import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
	FaEdit,
	FaEye,
	FaFilter,
	FaPlus,
	FaSearch,
	FaTrash,
	FaUserInjured,
} from 'react-icons/fa';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import Table from '../../components/ui/Table';
import type { Patient } from '../../types';
import { mockPatients } from '../../utils/mockData';

const ITEMS_PER_PAGE = 8;

type FilterStatus = 'All' | 'Active' | 'Inactive';

export default function PatientsPage() {
	const [patients, setPatients] = useState<Patient[]>(mockPatients);
	const [search, setSearch] = useState('');
	const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [editPatient, setEditPatient] = useState<Patient | null>(null);
	const [viewPatient, setViewPatient] = useState<Patient | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<Patient | null>(null);
	const { register, handleSubmit, reset, setValue } =
		useForm<Omit<Patient, 'id' | 'registeredDate'>>();

	const filtered = useMemo(
		() =>
			patients.filter((p) => {
				const matchSearch =
					p.name.toLowerCase().includes(search.toLowerCase()) ||
					p.email.toLowerCase().includes(search.toLowerCase()) ||
					p.id.toLowerCase().includes(search.toLowerCase());
				const matchStatus = filterStatus === 'All' || p.status === filterStatus;
				return matchSearch && matchStatus;
			}),
		[patients, search, filterStatus],
	);

	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
	const paged = filtered.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const openAdd = () => {
		setEditPatient(null);
		reset();
		setModalOpen(true);
	};
	const openEdit = (p: Patient) => {
		setEditPatient(p);
		setValue('name', p.name);
		setValue('email', p.email);
		setValue('phone', p.phone);
		setValue('address', p.address);
		setValue('age', p.age);
		setValue('gender', p.gender);
		setValue('bloodGroup', p.bloodGroup);
		setValue('status', p.status);
		setValue('lastVisit', p.lastVisit);
		setModalOpen(true);
	};

	const onSubmit = (data: Omit<Patient, 'id' | 'registeredDate'>) => {
		if (editPatient) {
			setPatients((ps) =>
				ps.map((p) => (p.id === editPatient.id ? { ...p, ...data } : p)),
			);
			toast.success('Patient updated successfully');
		} else {
			const newPatient: Patient = {
				...data,
				id: `P${(patients.length + 1).toString().padStart(3, '0')}`,
				registeredDate: new Date().toISOString().split('T')[0],
				lastVisit: '',
			} as Patient;
			setPatients((ps) => [newPatient, ...ps]);
			toast.success('Patient added successfully');
		}
		setModalOpen(false);
	};

	const handleDelete = (p: Patient) => {
		setPatients((ps) => ps.filter((x) => x.id !== p.id));
		toast.success('Patient removed');
		setDeleteConfirm(null);
	};

	const columns = [
		{
			key: 'id',
			header: 'Patient ID',
			render: (p: Patient) => (
				<span className="font-mono text-xs text-gray-500">{p.id}</span>
			),
		},
		{
			key: 'name',
			header: 'Patient',
			render: (p: Patient) => (
				<div className="flex items-center gap-2.5">
					<div className="h-8 w-8 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
						{p.name
							.split(' ')
							.map((n) => n[0])
							.slice(0, 2)
							.join('')}
					</div>
					<div>
						<p className="text-sm font-semibold text-gray-900">{p.name}</p>
						<p className="text-xs text-gray-400">{p.email}</p>
					</div>
				</div>
			),
		},
		{
			key: 'age',
			header: 'Age / Gender',
			render: (p: Patient) => (
				<span className="text-sm">
					{p.age}y · {p.gender}
				</span>
			),
		},
		{
			key: 'bloodGroup',
			header: 'Blood',
			render: (p: Patient) => (
				<span className="font-mono text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
					{p.bloodGroup}
				</span>
			),
		},
		{
			key: 'phone',
			header: 'Phone',
			render: (p: Patient) => (
				<span className="text-sm text-gray-600">{p.phone}</span>
			),
		},
		{
			key: 'status',
			header: 'Status',
			render: (p: Patient) => (
				<Badge variant={p.status === 'Active' ? 'success' : 'neutral'} dot>
					{p.status}
				</Badge>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			render: (p: Patient) => (
				<div className="flex items-center gap-1">
					<button
						onClick={() => setViewPatient(p)}
						className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
					>
						<FaEye className="h-3.5 w-3.5" />
					</button>
					<button
						onClick={() => openEdit(p)}
						className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
					>
						<FaEdit className="h-3.5 w-3.5" />
					</button>
					<button
						onClick={() => setDeleteConfirm(p)}
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
					<h1 className="text-2xl font-bold text-gray-900">Patients</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						{patients.length} total patients registered
					</p>
				</div>
				<Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
					Add Patient
				</Button>
			</div>

			<div className="bg-white rounded-2xl border border-gray-100 shadow-card">
				{/* Filters */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-gray-100">
					<div className="relative flex-1 max-w-sm">
						<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
						<input
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setCurrentPage(1);
							}}
							placeholder="Search by name, email or ID…"
							className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
						/>
					</div>
					<div className="flex items-center gap-2">
						<FaFilter className="h-3.5 w-3.5 text-gray-400" />
						{(['All', 'Active', 'Inactive'] as FilterStatus[]).map((s) => (
							<button
								key={s}
								onClick={() => {
									setFilterStatus(s);
									setCurrentPage(1);
								}}
								className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterStatus === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
							>
								{s}
							</button>
						))}
					</div>
				</div>
				<Table
					columns={columns}
					data={paged}
					emptyMessage="No patients found"
					emptyIcon={<FaUserInjured />}
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

			{/* Add/Edit Modal */}
			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				title={editPatient ? 'Edit Patient' : 'Add New Patient'}
				size="lg"
				footer={
					<>
						<Button variant="secondary" onClick={() => setModalOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit(onSubmit)}>
							{editPatient ? 'Save Changes' : 'Add Patient'}
						</Button>
					</>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{[
						{
							name: 'name' as const,
							label: 'Full Name',
							placeholder: 'James Harrington',
						},
						{
							name: 'email' as const,
							label: 'Email',
							type: 'email',
							placeholder: 'patient@email.com',
						},
						{
							name: 'phone' as const,
							label: 'Phone',
							placeholder: '+1 555-0100',
						},
						{
							name: 'address' as const,
							label: 'Address',
							placeholder: '123 Oak St',
						},
					].map((f) => (
						<div key={f.name}>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								{f.label}
							</label>
							<input
								{...register(f.name)}
								type={f.type || 'text'}
								placeholder={f.placeholder}
								className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
					))}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Age
						</label>
						<input
							{...register('age')}
							type="number"
							placeholder="30"
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Gender
						</label>
						<select
							{...register('gender')}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Blood Group
						</label>
						<select
							{...register('bloodGroup')}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
								<option key={g} value={g}>
									{g}
								</option>
							))}
						</select>
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
							<option value="Inactive">Inactive</option>
						</select>
					</div>
				</div>
			</Modal>

			{/* View Modal */}
			{viewPatient && (
				<Modal
					isOpen={!!viewPatient}
					onClose={() => setViewPatient(null)}
					title="Patient Profile"
					size="md"
					footer={
						<Button variant="secondary" onClick={() => setViewPatient(null)}>
							Close
						</Button>
					}
				>
					<div className="space-y-4">
						<div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
							<div className="h-14 w-14 rounded-2xl bg-primary-600 flex items-center justify-center text-white text-xl font-bold">
								{viewPatient.name
									.split(' ')
									.map((n) => n[0])
									.slice(0, 2)
									.join('')}
							</div>
							<div>
								<p className="text-lg font-bold text-gray-900">
									{viewPatient.name}
								</p>
								<p className="text-sm text-gray-500">{viewPatient.id}</p>
								<Badge
									variant={
										viewPatient.status === 'Active' ? 'success' : 'neutral'
									}
								>
									{viewPatient.status}
								</Badge>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3">
							{[
								['Age', `${viewPatient.age} years`],
								['Gender', viewPatient.gender],
								['Blood Group', viewPatient.bloodGroup],
								['Phone', viewPatient.phone],
								['Email', viewPatient.email],
								['Registered', viewPatient.registeredDate],
								['Last Visit', viewPatient.lastVisit || 'N/A'],
								['Address', viewPatient.address],
							].map(([k, v]) => (
								<div key={k} className="bg-surface-secondary rounded-xl p-3">
									<p className="text-xs text-gray-500">{k}</p>
									<p className="text-sm font-semibold text-gray-800 mt-0.5">
										{v}
									</p>
								</div>
							))}
						</div>
					</div>
				</Modal>
			)}

			{/* Delete Confirm */}
			{deleteConfirm && (
				<Modal
					isOpen={!!deleteConfirm}
					onClose={() => setDeleteConfirm(null)}
					title="Confirm Delete"
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
								onClick={() => handleDelete(deleteConfirm)}
							>
								Delete
							</Button>
						</>
					}
				>
					<p className="text-sm text-gray-600">
						Are you sure you want to remove{' '}
						<strong>{deleteConfirm.name}</strong>? This action cannot be undone.
					</p>
				</Modal>
			)}
		</div>
	);
}
