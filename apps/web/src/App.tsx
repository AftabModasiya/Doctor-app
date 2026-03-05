import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppointmentsPage from './pages/appointments/AppointmentsPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SignupPage from './pages/auth/SignupPage';
// Landing Page
import LandingPage from './pages/landing/LandingPage';
// Admin Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import DoctorsPage from './pages/doctors/DoctorsPage';
import MedicinesPage from './pages/medicines/MedicinesPage';
import PatientsPage from './pages/patients/PatientsPage';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Landing Page — public root */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* 404 → back to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
