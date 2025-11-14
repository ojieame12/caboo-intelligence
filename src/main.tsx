import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'

const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap'
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey && !isPrerender) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY. Set it in your environment variables.')
}

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root not found')
}

const app = (
  <StrictMode>
    {isPrerender ? (
      <App />
    ) : (
      <ClerkProvider publishableKey={clerkPubKey!}>
        <App />
      </ClerkProvider>
    )}
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
