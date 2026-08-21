import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth.js'
import { dashboardService } from '../../services/dashboardService.js'

const roleLabels = {
  ADMIN: 'Admin Dashboard',
  RECEPTIONIST: 'Receptionist Dashboard',
  EMPLOYEE: 'Employee Dashboard',
}

const adminStats = [
  { key: 'totalVisitors', label: 'Total Visitors' },
  { key: 'todaysVisitors', label: "Today's Visitors" },
  { key: 'pending', label: 'Pending Requests' },
  { key: 'approved', label: 'Approved Visitors' },
  { key: 'checkedIn', label: 'Checked-In Visitors' },
  { key: 'checkedOut', label: 'Checked-Out Visitors' },
  { key: 'rejected', label: 'Rejected Visitors' },
  { key: 'employees', label: 'Total Employees' },
]

const receptionistStats = [
  { key: 'todaysVisitors', label: "Today's Visitors" },
  { key: 'pending', label: 'Pending' },
  { key: 'checkedIn', label: 'Checked-In' },
  { key: 'checkedOut', label: 'Checked-Out' },
]

const employeeStats = [
  { key: 'pendingApprovals', label: 'Pending Approvals' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
]

export const DashboardPage = () => {
  const { user, logout } = useAuth()

  const { data = {}, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard-statistics', user?.role],
    queryFn: () => dashboardService.getStatistics(),
    staleTime: 30_000,
  })

  const statsDef =
    user?.role === 'ADMIN' ? adminStats : user?.role === 'RECEPTIONIST' ? receptionistStats : employeeStats

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
          <Link className="secondary-button" to="/activity">
            Activity
          </Link>
          <Link className="secondary-button" to="/reports">
            Reports
          </Link>
          {user?.role === 'EMPLOYEE' && (
            <Link className="secondary-button" to="/approvals">
              Approvals
            </Link>
          )}
          {(user?.role === 'RECEPTIONIST' || user?.role === 'ADMIN') && (
            <Link className="secondary-button" to="/receptionist">
              Reception Desk
            </Link>
          )}
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <section className="welcome-card">
        <div>
          <h2>Welcome, {user?.name}</h2>
          <p className="muted">Live statistics for your {roleLabels[user?.role] || 'dashboard'}.</p>
        </div>
        <span className="role-badge">{user?.role}</span>
      </section>

      <section className="panel">
        {isLoading && <div className="state-card">Loading dashboard statistics...</div>}

        {isError && (
          <div className="state-card error-state">{error?.response?.data?.message || 'Unable to load dashboard statistics.'}</div>
        )}

        {!isLoading && !isError && (
          <div className="stat-grid">
            {statsDef.map((stat) => (
              <div className="stat-card" key={stat.key}>
                <div className="stat-value">{data?.[stat.key] ?? 0}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

