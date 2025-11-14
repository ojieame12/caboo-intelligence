import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root not found')
}

// Clear fallback HTML before mounting React
if (container.hasChildNodes()) {
  container.innerHTML = ''
}

const app = (
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)

createRoot(container).render(app)
