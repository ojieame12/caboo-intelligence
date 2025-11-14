import { ReactNode } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, userId } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return null
  }

  if (!userId) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
