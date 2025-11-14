import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuthContext()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCF6EF]">
        <p className="font-['Geist'] text-neutral-500 text-sm">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
