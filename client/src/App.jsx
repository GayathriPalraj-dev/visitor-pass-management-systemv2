import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'
import { LoginPage } from './pages/auth/LoginPage.jsx'
import { DashboardPage } from './pages/dashboard/DashboardPage.jsx'
import { VisitorsPage } from './pages/visitors/VisitorsPage.jsx'
import { EmployeeApprovalsPage } from './pages/approvals/EmployeeApprovalsPage.jsx'
import { ReceptionistPage } from './pages/receptionist/ReceptionistPage.jsx'
import { ActivityPage } from './pages/activity/ActivityPage.jsx'
import { ReportsPage } from './pages/reports/ReportsPage.jsx'

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <ProtectedRoute path="/dashboard">
        <DashboardPage />
      </ProtectedRoute>
      <ProtectedRoute path="/visitors">
        <VisitorsPage />
      </ProtectedRoute>
      <ProtectedRoute path="/approvals">
        <EmployeeApprovalsPage />
      </ProtectedRoute>
      <ProtectedRoute path="/receptionist">
        <ReceptionistPage />
      </ProtectedRoute>
      <ProtectedRoute path="/activity">
        <ActivityPage />
      </ProtectedRoute>
      <ProtectedRoute path="/reports">
        <ReportsPage />
      </ProtectedRoute>
      <Redirect to="/dashboard" />
    </Switch>
  )
}

export default App
