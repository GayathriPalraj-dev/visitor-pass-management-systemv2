import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Redirect, useHistory } from 'react-router-dom'
import { z } from 'zod'
import { prewarmApi } from '../../api/axios.js'
import { useAuth } from '../../hooks/useAuth.js'
import { dashboardService } from '../../services/dashboardService.js'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const LoginPage = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const { isAuthenticated, login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'Admin@123',
    },
  })

  useEffect(() => {
    prewarmApi()
  }, [])

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      toast.success('Welcome back')
      queryClient.prefetchQuery({
        queryKey: ['dashboard-statistics', user?.role],
        queryFn: () => dashboardService.getStatistics(),
        staleTime: 30_000,
      })
      history.replace('/dashboard')
    },
    onError: (error) => {
      const data = error.response?.data
      toast.error(data?.errors?.[0]?.message || data?.message || 'Login failed')
    },
  })

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-brand-panel">
          <div className="brand-lockup">
            <span className="brand-icon" aria-hidden="true">VP</span>
            <div>
              <strong>Visitor Pass</strong>
              <span>Management System</span>
            </div>
          </div>

          <div className="brand-message">
            <h2>Secure. Simple. Smart.</h2>
            <p>Manage visitor approvals, check-ins, and workplace records with a clean role-based workflow.</p>
          </div>

          <div className="reception-illustration" aria-hidden="true">
            <div className="desk-card">
              <span />
              <strong>RECEPTION</strong>
            </div>
            <div className="pass-card">
              <span className="pass-photo" />
              <i />
              <i />
              <strong>VISITOR</strong>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div>
            <p className="eyebrow">Visitor Pass Management</p>
            <h1 id="login-title">Welcome Back!</h1>
            <p className="muted">Please sign in to your account.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
            <label>
              Email Address
              <input type="email" autoComplete="email" {...register('email')} />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </label>

            <label>
              Password
              <input type="password" autoComplete="current-password" {...register('password')} />
              {errors.password && <span className="field-error">{errors.password.message}</span>}
            </label>

            <button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-users">
            <strong>Demo users</strong>
            <span>admin@example.com / Admin@123</span>
            <span>reception@example.com / Reception@123</span>
            <span>employee@example.com / Employee@123</span>
          </div>
        </div>
      </section>
    </main>
  )
}
