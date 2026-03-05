import { Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaShieldAlt, FaChartBar, FaUserMd,
  FaPlay, FaArrowRight, FaUserInjured, FaPills, FaCheckCircle,
} from 'react-icons/fa';

const stats = [
  { value: '500+', label: 'Hospitals Trust Us' },
  { value: '50K+', label: 'Patients Managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Expert Support' },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-primary-950 to-gray-900 pt-16"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse" />
              Now with AI-powered diagnostics
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Smart Doctor{' '}
              <span className="bg-gradient-to-r from-primary-400 to-sky-400 bg-clip-text text-transparent">
                Management System
              </span>{' '}
              for Modern Hospitals
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              Streamline your entire hospital workflow — from patient registrations and 
              doctor scheduling to prescriptions, medicines, and analytics. All in one 
              powerful, secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:shadow-primary-500/40"
              >
                Start Free Trial
                <FaArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 backdrop-blur-sm transition-all"
              >
                <FaPlay className="h-3.5 w-3.5 text-primary-400" />
                Login to Dashboard
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              {[
                { icon: FaCheckCircle, text: 'HIPAA Compliant' },
                { icon: FaCheckCircle, text: 'No credit card required' },
                { icon: FaCheckCircle, text: '14-day free trial' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Preview Cards */}
          <div className="relative hidden lg:block">
            {/* Main Dashboard Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-gray-300">Today's Overview</p>
                  <p className="text-xl font-bold text-white">Hospital Dashboard</p>
                </div>
                <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <FaChartBar className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: FaUserInjured, label: 'Patients', value: '267', color: 'bg-sky-500/20 text-sky-300' },
                  { icon: FaUserMd, label: 'Doctors', value: '6', color: 'bg-violet-500/20 text-violet-300' },
                  { icon: FaPills, label: 'Medicines', value: '48', color: 'bg-emerald-500/20 text-emerald-300' },
                  { icon: FaCalendarCheck, label: 'Appointments', value: '12', color: 'bg-amber-500/20 text-amber-300' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">{value}</p>
                      <p className="text-xs text-gray-400">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini chart bars */}
              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-3">Weekly Appointments</p>
                <div className="flex items-end gap-2 h-14">
                  {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary-400/70 rounded-t-md transition-all" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
            </div>

            {/* Floating badge: Security */}
            <div className="absolute -top-6 -right-6 bg-emerald-600 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2">
              <FaShieldAlt className="h-4 w-4 text-white" />
              <span className="text-xs font-semibold text-white">HIPAA Secured</span>
            </div>

            {/* Floating badge: Users */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['bg-sky-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
                  <div key={i} className={`h-6 w-6 rounded-full ${c} border-2 border-white`} />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-800">500+ hospitals</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{value}</p>
                <p className="text-sm text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
