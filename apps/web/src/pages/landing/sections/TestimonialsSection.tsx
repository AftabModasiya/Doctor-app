import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    title: 'Chief Medical Officer',
    hospital: 'St. Luke\'s General Hospital',
    avatar: 'SM',
    avatarColor: 'from-sky-400 to-blue-500',
    rating: 5,
    quote: 'MediAdmin has completely transformed how we manage our hospital operations. Patient records are now instantly accessible, appointment scheduling is seamless, and our staff productivity has improved by over 40%.',
  },
  {
    name: 'Dr. James Okafor',
    title: 'Hospital Director',
    hospital: 'City Medical Center',
    avatar: 'JO',
    avatarColor: 'from-emerald-400 to-teal-500',
    rating: 5,
    quote: 'The best investment our clinic made this year. The prescription system, combined with real-time medicine inventory alerts, has eliminated stockouts and prescription errors. Our patients are safer and happier.',
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Department Head, Cardiology',
    hospital: 'Apollo Multi-Specialty Hospital',
    avatar: 'PS',
    avatarColor: 'from-violet-400 to-purple-500',
    rating: 5,
    quote: 'Implementation was incredibly smooth. The support team was phenomenal and the HIPAA compliance features gave us peace of mind immediately. I recommend MediAdmin to every hospital looking to modernize.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              500+ healthcare professionals
            </span>
          </h2>
          <p className="text-lg text-gray-500">
            Join thousands of doctors and hospital administrators who love MediAdmin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, title, hospital, avatar, avatarColor, rating, quote }) => (
            <div
              key={name}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-8"
            >
              <FaQuoteLeft className="h-7 w-7 text-primary-200 mb-4" />

              <p className="text-sm text-gray-600 leading-relaxed mb-6">{quote}</p>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: rating }).map((_, i) => (
                  <FaStar key={i} className="h-4 w-4 text-amber-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{title}</p>
                  <p className="text-xs text-primary-600 font-medium">{hospital}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust logos strip */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest font-medium">Trusted by healthcare leaders worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Apollo Hospitals', 'Fortis Health', 'Max Healthcare', 'Manipal Group', 'Aster DM Health'].map(name => (
              <span key={name} className="text-gray-400 font-bold text-lg tracking-tight hover:text-gray-600 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
