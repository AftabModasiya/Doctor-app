import { FaUserPlus, FaClinicMedical, FaUserMd, FaCalendarCheck, FaNotesMedical } from 'react-icons/fa';

const steps = [
  { number: '01', icon: FaUserPlus, title: 'Create Your Account', description: 'Sign up in under 2 minutes. No credit card needed for the free trial.', color: 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800' },
  { number: '02', icon: FaClinicMedical, title: 'Setup Your Clinic', description: 'Configure your hospital name, departments, billing settings, and preferences.', color: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800' },
  { number: '03', icon: FaUserMd, title: 'Add Doctors & Patients', description: 'Onboard your medical staff and start registering patient profiles into the system.', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
  { number: '04', icon: FaCalendarCheck, title: 'Manage Appointments', description: 'Start booking and tracking appointments with automated confirmations and reminders.', color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
  { number: '05', icon: FaNotesMedical, title: 'Track & Prescribe', description: 'Issue digital prescriptions, manage inventory, and generate detailed reports.', color: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Up and running in{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              minutes, not months
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Our guided onboarding gets your hospital digitized quickly — with zero technical expertise needed.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-violet-200 to-rose-200 dark:from-sky-900 dark:via-violet-900 dark:to-rose-900" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map(({ number, icon: Icon, title, description, color }, index) => (
              <div key={title} className="relative flex flex-col items-center text-center group">
                <div className={`relative z-10 h-24 w-24 rounded-3xl ${color} border flex flex-col items-center justify-center mb-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                  <span className="text-xs font-bold opacity-60 mb-1">{number}</span>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                {index < steps.length - 1 && <div className="lg:hidden mt-4 text-gray-300 dark:text-gray-600 text-lg">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
