import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

const rootElement = document.getElementById('root');

// Build-time SEO snapshots provide meaningful HTML before JavaScript loads.
// The interactive React application replaces that matching fallback content.
rootElement.replaceChildren();

ReactDOM.createRoot(rootElement).render(
  <App />
)
