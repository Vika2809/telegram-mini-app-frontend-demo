import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Buffer } from 'buffer';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { EnvUnsupported } from './app/initApp/EnvUnsupported';
import { init } from './app/initApp/init';
import './app/initApp/mockEnv';

// 👇 Глобально пробрасываем Buffer, чтобы его использовали любые библиотеки
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root')!);

(async () => {
    try {
        const launchParams = retrieveLaunchParams();
        const { tgWebAppPlatform: platform } = launchParams;
        const debug = (launchParams.tgWebAppStartParam ?? '').includes('platformer_debug') || __IS_DEV__;
        // Configure all application dependencies.
        await init({
            debug,
            eruda: debug && ['ios', 'android'].includes(platform),
            mockForMacOS: platform === 'macos',
        });

        root.render(
            <HashRouter>
                <StoreProvider>
                    <ErrorBoundary>
                        <TonConnectUIProvider manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}>
                            <App />
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                            />
                        </TonConnectUIProvider>
                    </ErrorBoundary>
                </StoreProvider>
            </HashRouter>,
        );
    } catch {
        root.render(<EnvUnsupported />);
    }
})();
