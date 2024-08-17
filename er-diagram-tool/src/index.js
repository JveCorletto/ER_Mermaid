import React from 'react';
import ReactDOM from 'react-dom/client';
import mermaid from 'mermaid';

import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Inicializa Mermaid.js
mermaid.initialize({ startOnLoad: true });

// Crea la raíz de renderizado y renderiza la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);