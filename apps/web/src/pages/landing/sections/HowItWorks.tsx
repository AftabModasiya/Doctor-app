import { FaUserPlus, FaClinicMedical, FaUserMd, FaCalendarCheck, FaNotesMedical } from 'react-icons/fa';

const steps = [
  {
    number: '01',
    icon: FaUserPlus,
    title: 'Create Your Account',
    description: 'Sign up in under 2 minutes with your email. No credit card needed for the free trial.',
    color: 'bg-sky-50 text-sky-600 border-sky-200',
    iconColor: 'bg-sky-600',
  },
  {
    number: '02',
    icon: FaClinicMedical,
    title: 'Setup Your Clinic',
    description: 'Configure your hospital name, departments, billing settings, and preferences.',
    color: 'bg-violet-50 text-violet-600 border-violet-200',
    iconColor: 'bg-violet-600',
  },
  {
    number: '03',
    icon: FaUserMd,
    title: 'Add Doctors & Patients',
    description: 'Onboard your medical staff and start registering patient profiles into the system.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    iconColor: 'bg-emerald-600',
  },
  {
    number: '04',
    icon: FaCalendarCheck,
    title: 'Manage Appointments',
    description: 'Start booking and tracking appointments with automated confirmations and reminders.',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    iconColor: 'bg-amber-600',
  },
  {
    number: '05',
    icon: FaNotesMedical,
    title: 'Track & Prescribe',
    description: 'Issue digital prescriptions, manage medicine inventory, and generate detailed reports.',
    color: 'bg-rose-50 text-rose-600 border-rose-200',
    iconColor: 'bg-rose-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Up and running in{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              minutes, not months
            </span>
          </h2>
          <p className="text-lg text-gray-500">
            Our guided onboarding gets your hospital digitized quickly — with zero technical expertise needed.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-violet-200 to-rose-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map(({ number, icon: Icon, title, description, color, iconColor }, index) => (
              <div key={title} className="relative flex flex-col items-center text-center group">
                {/* Number bubble */}
                <div className={`relative z-10 h-24 w-24 rounded-3xl ${color} border flex flex-col items-center justify-center mb-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                  <span className="text-xs font-bold opacity-60 mb-1">{number}</span>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>

                {/* Arrow connector (mobile/tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-4 text-gray-300 text-lg">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
