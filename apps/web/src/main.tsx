import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: '#fff',
							color: '#1a1a1a',
							borderRadius: '12px',
							border: '1px solid #f0f0f0',
							boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
							fontSize: '14px',
							fontFamily: 'DM Sans, sans-serif',
						},
						success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
						error: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
					}}
				/>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
