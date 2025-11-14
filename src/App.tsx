import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'
import Contact from './pages/Contact'
import Architecture from './pages/Architecture'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Connect from './pages/onboarding/Connect'
import Processing from './pages/onboarding/Processing'
import Settings from './pages/onboarding/Settings'
import Success from './pages/onboarding/Success'
import Dashboard from './pages/Dashboard'
import Billing from './pages/Billing'
import Integrations from './pages/Integrations'
import StoreInfo from './pages/StoreInfo'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding/connect" element={<Connect />} />
        <Route path="/onboarding/processing" element={<Processing />} />
        <Route path="/onboarding/settings" element={<Settings />} />
        <Route path="/onboarding/success" element={<Success />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations"
          element={
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <StoreInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
