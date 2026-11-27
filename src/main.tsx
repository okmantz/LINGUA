import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { StoreProvider } from './state/store';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { initSpeech } from './core/speech';
import { SpeechNotice } from './components/SpeechNotice';
import { markUpdateReady } from './core/update';
import { flushSaves } from './core/storage';

// A new version waits quietly (see core/update.ts); the learner taps "Update" when it suits them. Saves are flushed first.
const updateSW = registerSW({ immediate: true, onNeedRefresh() { markUpdateReady(() => { void flushSaves().finally(() => void updateSW(true)); }); } });
initSpeech();
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><StoreProvider><App /><SpeechNotice /></StoreProvider></HashRouter></StrictMode>);
