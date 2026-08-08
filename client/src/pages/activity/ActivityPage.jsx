import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { activityService } from '../../services/activityService.js'

const PAGE_SIZE = 10

export const ActivityPage = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['activity', page],
    queryFn: () => activityService.list({ page, limit: PAGE_SIZE }),
  })

  const items = data?.items || []
  const totalPages = data?.totalPages || 0

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1>Activity History</h1>
        </div>
      </header>

      <section className="card panel">
        {isLoading && <div className="state-card">Loading activity...</div>}

        {isError && (
          <div className="state-card error-state">{error?.response?.data?.message || 'Unable to load activity.'}</div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="state-card">No activity recorded yet.</div>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Visitor</th>
                  <th>Performed By</th>
                  <th>Remarks</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {items.map((log) => (
                  <tr key={log._id}>
                    <td>
                      <span className={`status-pill action-${log.action ? log.action.toLowerCase().replace(/\s+/g, '-') : ''}`}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <div className="strong-cell">{log.visitRequest?.visitor?.name || '—'}</div>
                      <div className="muted-text">{log.visitRequest?.visitor?.company || ''}</div>
                    </td>
                    <td>
                      <div className="strong-cell">{log.performedBy?.name || '—'}</div>
                      <div className="muted-text">{log.performedBy?.role || ''}</div>
                    </td>
                    <td>{log.remarks || '—'}</td>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && totalPages > 1 && (
          <div className="pagination">
            <button
              className="secondary-button"
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {data?.page || 1} of {totalPages}
            </span>
            <button
              className="secondary-button"
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
