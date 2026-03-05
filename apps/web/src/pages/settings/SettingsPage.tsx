import clsx from 'clsx';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
	FaBell,
	FaCamera,
	FaCog,
	FaLock,
	FaSave,
	FaUser,
} from 'react-icons/fa';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

type Tab = 'profile' | 'password' | 'notifications' | 'system';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
	{ id: 'profile', label: 'Profile', icon: FaUser },
	{ id: 'password', label: 'Change Password', icon: FaLock },
	{ id: 'notifications', label: 'Notifications', icon: FaBell },
	{ id: 'system', label: 'System', icon: FaCog },
];

function ToggleSwitch({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<button
			onClick={() => onChange(!checked)}
			className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-gray-300'}`}
		>
			<span
				className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
			/>
		</button>
	);
}

export default function SettingsPage() {
	const { user, updateUser } = useAuth();
	const [activeTab, setActiveTab] = useState<Tab>('profile');
	const [profile, setProfile] = useState({
		name: user?.name || '',
		email: user?.email || '',
		role: user?.role || '',
		phone: '+1 555-0001',
		department: 'Administration',
	});
	const [passwords, setPasswords] = useState({
		current: '',
		newPass: '',
		confirm: '',
	});
	const [notifications, setNotifications] = useState({
		appointments: true,
		prescriptions: true,
		medicines: true,
		reports: false,
		email: true,
		sms: false,
	});
	const [system, setSystem] = useState({
		timezone: 'America/New_York',
		language: 'English',
		dateFormat: 'MM/DD/YYYY',
		currency: 'USD',
		maintenanceMode: false,
	});
	const [profileLoading, setProfileLoading] = useState(false);

	const saveProfile = async () => {
		setProfileLoading(true);
		await new Promise((r) => setTimeout(r, 800));
		updateUser({ ...user!, name: profile.name, email: profile.email });
		toast.success('Profile updated successfully');
		setProfileLoading(false);
	};

	const changePassword = async () => {
		if (!passwords.current) {
			toast.error('Enter current password');
			return;
		}
		if (passwords.newPass.length < 6) {
			toast.error('New password must be 6+ characters');
			return;
		}
		if (passwords.newPass !== passwords.confirm) {
			toast.error('Passwords do not match');
			return;
		}
		await new Promise((r) => setTimeout(r, 600));
		toast.success('Password changed successfully');
		setPasswords({ current: '', newPass: '', confirm: '' });
	};

	const Field = ({
		label,
		value,
		type = 'text',
		onChange,
	}: {
		label: string;
		value: string;
		type?: string;
		onChange: (v: string) => void;
	}) => (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1.5">
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-gray-300"
			/>
		</div>
	);

	const NotificationRow = ({
		label,
		desc,
		checked,
		onChange,
	}: {
		label: string;
		desc: string;
		checked: boolean;
		onChange: (v: boolean) => void;
	}) => (
		<div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
			<div>
				<p className="text-sm font-medium text-gray-900">{label}</p>
				<p className="text-xs text-gray-500">{desc}</p>
			</div>
			<ToggleSwitch checked={checked} onChange={onChange} />
		</div>
	);

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
				<p className="text-sm text-gray-500 mt-0.5">
					Manage your account and system preferences
				</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-5">
				{/* Sidebar Tabs */}
				<div className="lg:w-56 flex-shrink-0">
					<div className="bg-white rounded-2xl border border-gray-100 shadow-card p-2">
						{tabs.map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								onClick={() => setActiveTab(id)}
								className={clsx(
									'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5',
									activeTab === id
										? 'bg-primary-600 text-white shadow-sm'
										: 'text-gray-600 hover:bg-gray-100',
								)}
							>
								<Icon className="h-4 w-4" />
								{label}
							</button>
						))}
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-card">
					{activeTab === 'profile' && (
						<div className="p-6 space-y-5">
							<div>
								<h2 className="text-base font-semibold text-gray-900">
									Admin Profile
								</h2>
								<p className="text-sm text-gray-500">
									Manage your personal information
								</p>
							</div>
							{/* Avatar */}
							<div className="flex items-center gap-4">
								<div className="relative">
									<div className="h-16 w-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
										{profile.name
											.split(' ')
											.map((n) => n[0])
											.join('')
											.slice(0, 2)}
									</div>
									<button className="absolute -bottom-1 -right-1 h-6 w-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
										<FaCamera className="h-2.5 w-2.5 text-gray-500" />
									</button>
								</div>
								<div>
									<p className="text-sm font-semibold text-gray-900">
										{profile.name}
									</p>
									<p className="text-xs text-gray-500">{profile.role}</p>
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field
									label="Full Name"
									value={profile.name}
									onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
								/>
								<Field
									label="Email Address"
									value={profile.email}
									type="email"
									onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
								/>
								<Field
									label="Phone"
									value={profile.phone}
									onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
								/>
								<Field
									label="Department"
									value={profile.department}
									onChange={(v) => setProfile((p) => ({ ...p, department: v }))}
								/>
								<div className="sm:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										Role
									</label>
									<input
										value={profile.role}
										readOnly
										className="w-full px-4 py-2.5 text-sm border border-gray-100 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed"
									/>
								</div>
							</div>
							<div className="pt-2">
								<Button
									loading={profileLoading}
									onClick={saveProfile}
									leftIcon={<FaSave className="h-3.5 w-3.5" />}
								>
									Save Profile
								</Button>
							</div>
						</div>
					)}

					{activeTab === 'password' && (
						<div className="p-6 space-y-5">
							<div>
								<h2 className="text-base font-semibold text-gray-900">
									Change Password
								</h2>
								<p className="text-sm text-gray-500">
									Keep your account secure with a strong password
								</p>
							</div>
							<div className="max-w-md space-y-4">
								{[
									{
										label: 'Current Password',
										key: 'current',
										val: passwords.current,
									},
									{
										label: 'New Password',
										key: 'newPass',
										val: passwords.newPass,
									},
									{
										label: 'Confirm New Password',
										key: 'confirm',
										val: passwords.confirm,
									},
								].map(({ label, key, val }) => (
									<div key={key}>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											{label}
										</label>
										<input
											type="password"
											value={val}
											onChange={(e) =>
												setPasswords((p) => ({ ...p, [key]: e.target.value }))
											}
											placeholder="••••••••"
											className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
										/>
									</div>
								))}
								<div className="p-3 bg-sky-50 border border-sky-200 rounded-xl">
									<p className="text-xs text-sky-700">
										Password must be at least 6 characters long
									</p>
								</div>
								<Button
									onClick={changePassword}
									leftIcon={<FaLock className="h-3.5 w-3.5" />}
								>
									Update Password
								</Button>
							</div>
						</div>
					)}

					{activeTab === 'notifications' && (
						<div className="p-6 space-y-5">
							<div>
								<h2 className="text-base font-semibold text-gray-900">
									Notification Preferences
								</h2>
								<p className="text-sm text-gray-500">
									Choose what you want to be notified about
								</p>
							</div>
							<div>
								<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
									In-App Notifications
								</p>
								<div className="bg-surface-secondary rounded-xl px-4">
									<NotificationRow
										label="New Appointments"
										desc="When a new appointment is booked"
										checked={notifications.appointments}
										onChange={(v) =>
											setNotifications((n) => ({ ...n, appointments: v }))
										}
									/>
									<NotificationRow
										label="Prescriptions"
										desc="When a new prescription is created"
										checked={notifications.prescriptions}
										onChange={(v) =>
											setNotifications((n) => ({ ...n, prescriptions: v }))
										}
									/>
									<NotificationRow
										label="Medicine Alerts"
										desc="Low stock and expiry warnings"
										checked={notifications.medicines}
										onChange={(v) =>
											setNotifications((n) => ({ ...n, medicines: v }))
										}
									/>
									<NotificationRow
										label="Weekly Reports"
										desc="Automated weekly summary report"
										checked={notifications.reports}
										onChange={(v) =>
											setNotifications((n) => ({ ...n, reports: v }))
										}
									/>
								</div>
							</div>
							<div>
								<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
									Delivery Methods
								</p>
								<div className="bg-surface-secondary rounded-xl px-4">
									<NotificationRow
										label="Email Notifications"
										desc="Receive alerts via email"
										checked={notifications.email}
										onChange={(v) =>
											setNotifications((n) => ({ ...n, email: v }))
										}
									/>
									<NotificationRow
										label="SMS Notifications"
										desc="Receive alerts via text message"
										checked={notifications.sms}
										onChange={(v) =>
											setNotifications((n) => ({ ...n, sms: v }))
										}
									/>
								</div>
							</div>
							<Button
								onClick={() => toast.success('Notification preferences saved')}
								leftIcon={<FaSave className="h-3.5 w-3.5" />}
							>
								Save Preferences
							</Button>
						</div>
					)}

					{activeTab === 'system' && (
						<div className="p-6 space-y-5">
							<div>
								<h2 className="text-base font-semibold text-gray-900">
									System Configuration
								</h2>
								<p className="text-sm text-gray-500">
									Configure global system settings
								</p>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
								{[
									{
										label: 'Timezone',
										value: system.timezone,
										key: 'timezone',
									},
									{
										label: 'Language',
										value: system.language,
										key: 'language',
									},
									{
										label: 'Date Format',
										value: system.dateFormat,
										key: 'dateFormat',
									},
									{
										label: 'Currency',
										value: system.currency,
										key: 'currency',
									},
								].map(({ label, value, key }) => (
									<div key={key}>
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											{label}
										</label>
										<input
											value={value}
											onChange={(e) =>
												setSystem((s) => ({ ...s, [key]: e.target.value }))
											}
											className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
										/>
									</div>
								))}
							</div>
							<div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-lg">
								<div>
									<p className="text-sm font-semibold text-amber-900">
										Maintenance Mode
									</p>
									<p className="text-xs text-amber-700">
										Temporarily disable access for non-admin users
									</p>
								</div>
								<ToggleSwitch
									checked={system.maintenanceMode}
									onChange={(v) => {
										setSystem((s) => ({ ...s, maintenanceMode: v }));
										toast(
											v
												? '⚠️ Maintenance mode enabled'
												: 'Maintenance mode disabled',
										);
									}}
								/>
							</div>
							<Button
								onClick={() => toast.success('System settings saved')}
								leftIcon={<FaSave className="h-3.5 w-3.5" />}
							>
								Save Settings
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
