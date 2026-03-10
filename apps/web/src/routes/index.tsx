import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "@shared/components/ErrorBoundary";
import ProtectedRoute from "@routes/ProtectedRoute";
import Layout from "@components/layout/Layout";
import Loader from "@shared/components/Loader";
const LandingPage = lazy(() => import("@pages/landing/LandingPage"));
const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("@pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@pages/auth/ResetPasswordPage"));
const DashboardPage = lazy(() => import("@pages/dashboard/DashboardPage"));
const PatientsPage = lazy(() => import("@pages/patients/PatientsPage"));
const DoctorsPage = lazy(() => import("@pages/doctors/DoctorsPage"));
const MedicinesPage = lazy(() => import("@pages/medicines/MedicinesPage"));
const PrescriptionsPage = lazy(
  () => import("@pages/prescriptions/PrescriptionsPage"),
);
const AppointmentsPage = lazy(
  () => import("@pages/appointments/AppointmentsPage"),
);
const ReportsPage = lazy(() => import("@pages/reports/ReportsPage"));
const SettingsPage = lazy(() => import("@pages/settings/SettingsPage"));
const AppSettingsPage = lazy(
  () => import("@pages/app-settings/AppSettingsPage"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/patients",
            element: <PatientsPage />,
          },
          {
            path: "/doctors",
            element: <DoctorsPage />,
          },
          {
            path: "/medicines",
            element: <MedicinesPage />,
          },
          {
            path: "/prescriptions",
            element: <PrescriptionsPage />,
          },
          {
            path: "/appointments",
            element: <AppointmentsPage />,
          },
          {
            path: "/reports",
            element: <ReportsPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/app-settings",
            element: <AppSettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const AppRoutesProvider = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRoutesProvider;
