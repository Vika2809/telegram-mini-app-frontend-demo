import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
//import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), svgr()],
        //analyzer({ openAnalyzer: env.VITE_IS_OPEN_ANALYZER === 'true' })],
        define: {
            __TMA_URL__: JSON.stringify(env.VITE_TMA_URL),
            __LOCAL_TELEGRAM_ID__: JSON.stringify(env.VITE_LOCAL_TELEGRAM_ID),
            __IS_DEV__: JSON.stringify(env.VITE_IS_DEV === 'true') || JSON.stringify(true),
            __IS_STORYBOOK__: JSON.stringify(env.VITE_IS_STORYBOOK === 'true') || JSON.stringify(false),
            __API__: JSON.stringify(env.VITE_API_URL) || JSON.stringify('http://localhost:8000/'),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                buffer: 'buffer',
            },
        },
        server: {
            port: Number(env.VITE_APP_PORT) || 3005,
            host: '0.0.0.0',
            allowedHosts: env.VITE_ALLOWED_HOSTS?.split(',') || ['localhost'],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/app/styles/_variables.scss" as *; @use "@/app/styles/_mixins.scss" as *;`,
                },
            },
        },
    };
});
