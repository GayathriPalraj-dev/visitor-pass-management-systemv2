import { useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService.js'
import { AuthContext } from './authContext.js'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token))

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setIsBootstrapping(false)
        return
      }

      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch {
        localStorage.removeItem('token')
        setToken(null)
      } finally {
        setIsBootstrapping(false)
      }
    }

    loadUser()
  }, [token])

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials)
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      if (token) {
        await authService.logout()
      }
    } finally {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
    }
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isBootstrapping,
      login,
      logout,
    }),
    [token, user, isBootstrapping, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
