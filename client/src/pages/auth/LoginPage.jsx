import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Redirect, useHistory } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../hooks/useAuth.js'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const LoginPage = () => {
  const history = useHistory()
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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Welcome back')
      history.replace('/dashboard')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <main className="auth-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1 id="login-title">Sign in</h1>
          <p className="muted">Use your assigned role account to continue.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
          <label>
            Email
            <input type="email" autoComplete="email" {...register('email')} />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </label>

          <label>
            Password
            <input type="password" autoComplete="current-password" {...register('password')} />
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </label>

          <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="demo-users">
          <strong>Seed users</strong>
          <span>admin@example.com / Admin@123</span>
          <span>reception@example.com / Reception@123</span>
          <span>employee@example.com / Employee@123</span>
        </div>
      </section>
    </main>
  )
}
