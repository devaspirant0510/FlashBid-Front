import { createRoot } from 'react-dom/client';
import React from 'react';
import '@app/index.css';
import { App } from '@/app';

import { worker } from '@app/mocks';

async function enableMocking() {
    // if (import.meta.env.VITE_MODE === "development") {
    //     await worker.start()
    //
    // }
}
enableMocking().then(() => {
    createRoot(document.getElementById('root')).render(<App />);
});
