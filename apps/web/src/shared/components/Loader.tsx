import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-surface-secondary">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_70%_65%,rgba(2,132,199,0.16),transparent_45%)]" />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <div className="relative h-36 w-36">
          {/* Outer pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary-200/80 animate-medical-pulse" />
          <div className="absolute inset-2 rounded-full border border-primary-300/80 animate-medical-pulse [animation-delay:180ms]" />

          {/* Spinner ring */}
          <div className="absolute inset-4 rounded-full border-[3px] border-transparent border-t-primary-600 border-r-primary-500 animate-spin" />

          {/* Inner circle with centered + */}
          <div className="absolute inset-8 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-card">
            <svg
              className="h-12 w-12 animate-breathing"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <rect x="20" y="8" width="8" height="32" rx="3" fill="white" />
              <rect x="8" y="20" width="32" height="8" rx="3" fill="white" />
              <rect
                x="22"
                y="10"
                width="4"
                height="28"
                rx="2"
                fill="rgba(255,255,255,0.7)"
              />
              <rect
                x="10"
                y="22"
                width="28"
                height="4"
                rx="2"
                fill="rgba(255,255,255,0.7)"
              />
            </svg>
          </div>

          {/* Side dots */}
          <div className="absolute -left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-400/80 animate-pulse" />
          <div className="absolute -right-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-400/80 animate-pulse [animation-delay:250ms]" />
        </div>

        {/* Text */}
        <p className="text-sm font-semibold tracking-wide text-primary-700">
          Preparing your medical workspace...
        </p>
      </div>
    </div>
  );
};

export default Loader;
