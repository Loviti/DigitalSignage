import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@workspaceModules': path.resolve(__dirname, './src/modules/workspace/modules'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@config': path.resolve(__dirname, './src/config'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@stores': path.resolve(__dirname, './src/stores'),
        },
    },
    server: {
        port: parseInt(process.env.VITE_PORT || '3001'),
        host: '0.0.0.0',
        hmr: {
            protocol: 'ws',
            host: '0.0.0.0',
            port: parseInt(process.env.VITE_PORT || '3001')
        }
    }
})
