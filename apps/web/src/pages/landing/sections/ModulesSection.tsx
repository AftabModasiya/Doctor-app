import {
  FaTachometerAlt, FaUserInjured, FaUserMd, FaPills,
  FaNotesMedical, FaCalendarCheck, FaChartBar, FaCog,
} from 'react-icons/fa';

const modules = [
  { icon: FaTachometerAlt, name: 'Dashboard', desc: 'Real-time KPIs, charts & activity feed', color: 'from-sky-500 to-blue-600' },
  { icon: FaUserInjured, name: 'Patients', desc: 'Complete patient records & history', color: 'from-emerald-500 to-teal-600' },
  { icon: FaUserMd, name: 'Doctors', desc: 'Staff profiles, availability & schedules', color: 'from-violet-500 to-purple-600' },
  { icon: FaPills, name: 'Medicines', desc: 'Inventory tracking & expiry alerts', color: 'from-amber-500 to-orange-600' },
  { icon: FaNotesMedical, name: 'Prescriptions', desc: 'Digital prescriptions & history', color: 'from-rose-500 to-pink-600' },
  { icon: FaCalendarCheck, name: 'Appointments', desc: 'Booking, scheduling & reminders', color: 'from-cyan-500 to-sky-600' },
  { icon: FaChartBar, name: 'Reports', desc: 'Analytics, trends & CSV exports', color: 'from-indigo-500 to-blue-600' },
  { icon: FaCog, name: 'Settings', desc: 'Profile, notifications & system config', color: 'from-gray-500 to-slate-600' },
];

export default function ModulesSection() {
  return (
    <section id="modules" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Modules
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            8 Powerful Modules,{' '}
            <span className="bg-gradient-to-r from-teal-600 to-sky-500 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Each module is purpose-built for hospital operations, designed to work seamlessly together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map(({ icon: Icon, name, desc, color }) => (
            <div
              key={name}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-sm transition-transform group-hover:scale-110`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
