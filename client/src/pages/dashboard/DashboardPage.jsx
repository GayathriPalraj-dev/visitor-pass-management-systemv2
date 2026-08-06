import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const roleLabels = {
  ADMIN: 'Admin Dashboard',
  RECEPTIONIST: 'Receptionist Dashboard',
  EMPLOYEE: 'Employee Dashboard',
}

export const DashboardPage = () => {
  const { user, logout } = useAuth()

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1>{roleLabels[user?.role] || 'Dashboard'}</h1>
        </div>
        <div className="topbar-actions">
          <Link className="secondary-button" to="/visitors">
            Manage Visitors
          </Link>
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <section className="welcome-card">
        <div>
          <h2>Welcome, {user?.name}</h2>
          <p className="muted">
            Authentication, JWT persistence, protected routing, and role identity are ready.
            Visitor workflows will be added in the next modules.
          </p>
        </div>
        <span className="role-badge">{user?.role}</span>
      </section>
    </main>
  )
}
