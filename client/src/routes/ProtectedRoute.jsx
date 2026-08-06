import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export const ProtectedRoute = ({ children, ...routeProps }) => {
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <div className="screen-state">Loading session...</div>
  }

  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
