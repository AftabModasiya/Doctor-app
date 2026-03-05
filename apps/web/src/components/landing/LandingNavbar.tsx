import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHospital, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm">
              <FaHospital className="h-4.5 w-4.5 text-white" />
            </div>
            <span className={clsx('text-lg font-bold transition-colors', scrolled ? 'text-gray-900' : 'text-white')}>
              Medi<span className="text-primary-400">Admin</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={user ? '/dashboard' : '/login'}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-xl transition-all',
                scrolled ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              {user ? 'Dashboard' : 'Login'}
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={clsx(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            )}
          >
            {mobileOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        'md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 overflow-hidden',
        mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.href)}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link to={user ? '/dashboard' : '/login'} onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200">
              {user ? 'Dashboard' : 'Login'}
            </Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl transition-colors hover:bg-primary-700">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
