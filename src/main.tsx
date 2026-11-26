import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { StoreProvider } from './state/store';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { initSpeech } from './core/speech';
import { SpeechNotice } from './components/SpeechNotice';

registerSW({ immediate: true });
initSpeech();
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><StoreProvider><App /><SpeechNotice /></StoreProvider></HashRouter></StrictMode>);
