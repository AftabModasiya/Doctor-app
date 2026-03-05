import { Link } from 'react-router-dom';
import { FaHospital, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const footerLinks = {
  Product: ['Features', 'Modules', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About Us', 'Blog', 'Careers', 'Press', 'Partners'],
  Support: ['Documentation', 'Help Center', 'Community', 'Status', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'HIPAA Compliance'],
};

export default function LandingFooter() {
  return (
    <footer className="bg-gray-950 text-gray-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <FaHospital className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Medi<span className="text-primary-400">Admin</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              The all-in-one hospital management platform trusted by clinics and hospitals worldwide to modernize patient care.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaPhone className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                <span>+1 (800) 555-MEDI</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaEnvelope className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                <span>hello@mediadmin.io</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaMapMarkerAlt className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                <span>123 Health St, San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 MediAdmin Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: FaFacebookF, label: 'Facebook' },
              { icon: FaTwitter, label: 'Twitter' },
              { icon: FaLinkedinIn, label: 'LinkedIn' },
              { icon: FaInstagram, label: 'Instagram' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
