import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { reportsService } from '../../services/reportsService.js'

const FILTERS = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'custom', label: 'Custom Range' },
]

const toISODate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const statDefs = [
  { key: 'totalVisitors', label: 'Total Visitors' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'checkedIn', label: 'Checked-In' },
  { key: 'checkedOut', label: 'Checked-Out' },
  { key: 'cancelled', label: 'Cancelled' },
]

const activeRange = (filter) => {
  const now = new Date()

  if (filter === 'today') {
    return { from: toISODate(now), to: toISODate(now) }
  }

  if (filter === 'week') {
    const start = new Date(now)
    const day = (now.getDay() + 6) % 7
    start.setDate(now.getDate() - day)
    return { from: toISODate(start), to: toISODate(now) }
  }

  if (filter === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    return { from: toISODate(start), to: toISODate(now) }
  }

  return { from: '', to: '' }
}

export const ReportsPage = () => {
  const [filter, setFilter] = useState('today')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const computed = useMemo(() => {
    if (filter === 'custom') {
      return { from: customFrom, to: customTo }
    }
    return activeRange(filter)
  }, [filter, customFrom, customTo])

  const { data = {}, isLoading, isError, error } = useQuery({
    queryKey: ['reports', computed.from, computed.to],
    queryFn: () => reportsService.getReports(computed),
    enabled: filter !== 'custom' || Boolean(customFrom && customTo),
  })

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1>Reports</h1>
        </div>
      </header>

      <section className="card panel">
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-chip ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}

          {filter === 'custom' && (
            <>
              <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} title="From date" />
              <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} title="To date" />
            </>
          )}
        </div>

        {isLoading && <div className="state-card">Loading reports...</div>}

        {isError && (
          <div className="state-card error-state">{error?.response?.data?.message || 'Unable to load reports.'}</div>
        )}

        {filter === 'custom' && !(customFrom && customTo) && (
          <div className="state-card">Select a start and end date to view the custom report.</div>
        )}

        {!isLoading && !isError && (filter !== 'custom' || (customFrom && customTo)) && (
          <div className="stat-grid">
            {statDefs.map((stat) => (
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
