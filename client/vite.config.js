import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'process.env': import.meta,
	},
	server: {
		proxy: {
			'/api/users/': 'http://localhost:5000',
			'/api/vault/': 'http://localhost:5000',
		},
	},
});
