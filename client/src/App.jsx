import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'
import { LoginPage } from './pages/auth/LoginPage.jsx'
import { DashboardPage } from './pages/dashboard/DashboardPage.jsx'
import { VisitorsPage } from './pages/visitors/VisitorsPage.jsx'

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
      <Redirect to="/dashboard" />
    </Switch>
  )
}

export default App
