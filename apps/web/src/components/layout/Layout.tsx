import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="flex h-screen bg-surface-secondary overflow-hidden">
			<Sidebar
				collapsed={collapsed}
				onToggle={() => setCollapsed(!collapsed)}
				mobileOpen={mobileOpen}
				onMobileClose={() => setMobileOpen(false)}
			/>
			<div className="flex flex-col flex-1 min-w-0 overflow-hidden">
				<Navbar onMenuClick={() => setMobileOpen(true)} />
				<main className="flex-1 overflow-y-auto p-4 lg:p-6">
					<div className="animate-fade-in">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
