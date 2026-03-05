import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaStar } from 'react-icons/fa';
import clsx from 'clsx';

const plans = [
  {
    name: 'Starter', price: 49, period: '/month',
    description: 'Perfect for small clinics and solo practitioners.', highlight: false,
    ctaClass: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/30',
    features: [
      { text: 'Up to 2 Doctors', included: true }, { text: 'Up to 500 Patients', included: true },
      { text: 'Appointment Booking', included: true }, { text: 'Basic Prescriptions', included: true },
      { text: 'Medicine Inventory', included: true }, { text: 'Email Support', included: true },
      { text: 'Advanced Reports', included: false }, { text: 'Custom Branding', included: false },
      { text: 'API Access', included: false }, { text: 'Priority Support', included: false },
    ],
  },
  {
    name: 'Professional', price: 129, period: '/month',
    description: 'The most popular choice for growing hospitals.', highlight: true,
    ctaClass: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200 dark:shadow-primary-900',
    features: [
      { text: 'Up to 10 Doctors', included: true }, { text: 'Up to 5,000 Patients', included: true },
      { text: 'Appointment Booking', included: true }, { text: 'Full Prescription System', included: true },
      { text: 'Medicine Inventory', included: true }, { text: 'Advanced Reports & Analytics', included: true },
      { text: 'Custom Branding', included: true }, { text: 'Priority Email & Chat', included: true },
      { text: 'API Access', included: false }, { text: 'Dedicated Account Manager', included: false },
    ],
  },
  {
    name: 'Enterprise', price: 299, period: '/month',
    description: 'For large hospital networks and multi-campus operations.', highlight: false,
    ctaClass: 'border border-gray-800 text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    features: [
      { text: 'Unlimited Doctors', included: true }, { text: 'Unlimited Patients', included: true },
      { text: 'Appointment Booking', included: true }, { text: 'Full Prescription System', included: true },
      { text: 'Medicine Inventory', included: true }, { text: 'Advanced Reports & Analytics', included: true },
      { text: 'Custom Branding', included: true }, { text: 'API Access & Webhooks', included: true },
      { text: 'Dedicated Account Manager', included: true }, { text: '24/7 Phone & SLA Support', included: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">pricing</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No hidden fees. Cancel anytime. Start your 14-day free trial today — no credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map(({ name, price, period, description, highlight, ctaClass, features }) => (
            <div
              key={name}
              className={clsx(
                'relative bg-white dark:bg-gray-800 rounded-3xl border-2 p-8 transition-all duration-300',
                highlight
                  ? 'border-primary-500 shadow-xl shadow-primary-100 dark:shadow-primary-900/30'
                  : 'border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5'
              )}
            >
              {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    <FaStar className="h-3 w-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{period}</span>
                </div>
              </div>

              <Link to="/signup" className={clsx('block w-full text-center py-3 rounded-2xl text-sm font-semibold transition-all mb-8', ctaClass)}>
                Get Started
              </Link>

              <ul className="space-y-3">
                {features.map(({ text, included }) => (
                  <li key={text} className="flex items-center gap-3">
                    {included
                      ? <FaCheck className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      : <FaTimes className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />}
                    <span className={clsx('text-sm', included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600')}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Need a custom enterprise plan?{' '}
          <a href="#contact" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Contact our sales team →
          </a>
        </p>
      </div>
    </section>
  );
}
