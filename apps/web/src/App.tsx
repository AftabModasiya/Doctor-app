import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutesProvider from "@routes";
import { ThemeProvider } from "@context/ThemeContext";
import { AuthProvider } from "@context/AuthContext";

export default function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutesProvider />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#1a1a1a",
                borderRadius: "12px",
                border: "1px solid #f0f0f0",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                fontSize: "14px",
                fontFamily: "DM Sans, sans-serif",
              },
              success: {
                iconTheme: { primary: "#22c55e", secondary: "#fff" },
              },
              error: { iconTheme: { primary: "#f43f5e", secondary: "#fff" } },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  );
}
