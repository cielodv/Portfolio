import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
