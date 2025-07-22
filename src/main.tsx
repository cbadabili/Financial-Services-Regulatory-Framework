import { createRoot } from 'react-dom/client';
// Use the primary application entry now that targeted fixes are in place.
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
