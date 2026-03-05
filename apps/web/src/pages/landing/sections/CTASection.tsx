import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaCheckCircle, FaHospital } from 'react-icons/fa';

const perks = [
  'No credit card required',
  'HIPAA compliant from day one',
  '14-day free trial',
  'Cancel anytime',
];

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-950 via-primary-950 to-primary-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-600 rounded-3xl shadow-lg shadow-primary-900 mb-8 mx-auto">
          <FaHospital className="h-8 w-8 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Start managing your hospital{' '}
          <span className="bg-gradient-to-r from-primary-400 to-sky-400 bg-clip-text text-transparent">
            smarter today
          </span>
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
          Join over 500 hospitals and clinics already using MediAdmin to streamline 
          operations, improve patient outcomes, and grow their practice.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-base font-bold rounded-2xl shadow-lg shadow-primary-900/50 transition-all hover:-translate-y-0.5 hover:shadow-primary-500/40"
          >
            Start Your Free Trial
            <FaArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white text-base font-semibold rounded-2xl backdrop-blur-sm transition-all"
          >
            Sign In to Dashboard
          </Link>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
          {perks.map(perk => (
            <div key={perk} className="flex items-center gap-2">
              <FaCheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
