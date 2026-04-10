import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const domNode = document.getElementById('root');
if (!domNode) {
    throw new Error("Missing root node!")
}

const root = createRoot(domNode);
root.render(
    <React.StrictMode>
        <App />
        </React.StrictMode>        );