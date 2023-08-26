import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root') 
if (!domNode) throw new Error('Failed to find the root element');
const root = createRoot(domNode)
root.render(<App />);
