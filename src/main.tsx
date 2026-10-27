import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/original.css';
import './styles/base-whimsy.css';
import './styles/interactions.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
