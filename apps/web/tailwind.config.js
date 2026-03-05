/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: '475px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extend: {
			fontFamily: {
				sans: [
					'DM Sans',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'sans-serif',
				],
				display: [
					'DM Sans',
					'-apple-system',
					'BlinkMacSystemFont',
					'sans-serif',
				],
				mono: [
					'JetBrains Mono',
					'SF Mono',
					'Monaco',
					'Cascadia Code',
					'monospace',
				],
			},
			colors: {
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},
				medical: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
				},
				surface: {
					primary: '#ffffff',
					secondary: '#f8fafc',
					tertiary: '#f1f5f9',
				},
			},
			boxShadow: {
				card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
				'card-hover':
					'0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -6px rgba(0,0,0,0.05)',
				elevated: '0 20px 40px -12px rgba(0,0,0,0.1)',
				'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.1)',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-in': 'slideIn 0.3s ease-out',
				'slide-in-right': 'slideInRight 0.3s ease-out',
				'pulse-dot': 'pulseDot 2s cubic-bezier(0.4,0,0.6,1) infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideIn: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				pulseDot: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
			},
			borderRadius: {
				xl: '0.75rem',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
		},
	},
	plugins: [],
};
