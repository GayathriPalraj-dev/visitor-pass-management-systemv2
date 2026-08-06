import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { visitorService } from '../../services/visitorService.js'
import { checkinService } from '../../services/checkinService.js'

export const ReceptionistPage = () => {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ['receptionist-visitors', search, status],
    queryFn: () => visitorService.list({ search, status }),
  })

  const checkInMutation = useMutation({
    mutationFn: (id) => checkinService.checkIn(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['receptionist-visitors'] })
      toast.success('Visitor checked in')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Check-in failed')
    },
  })

  const checkOutMutation = useMutation({
    mutationFn: (id) => checkinService.checkOut(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['receptionist-visitors'] })
      toast.success('Visitor checked out')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Check-out failed')
    },
  })

  const list = useMemo(() => data || [], [data])

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1>Receptionist Desk</h1>
        </div>
      </header>

      <section className="card panel">
        <div className="filters">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search visitor, company or employee" />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="CHECKED_IN">CHECKED_IN</option>
            <option value="CHECKED_OUT">CHECKED_OUT</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        {isLoading && <div className="state-card">Loading visits...</div>}
        {isError && <div className="state-card error-state">{error?.response?.data?.message || 'Unable to load visits.'}</div>}

        {!isLoading && !isError && list.length === 0 && <div className="state-card">No visits found.</div>}

        {!isLoading && !isError && list.length > 0 && (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Employee</th>
                  <th>Purpose</th>
                  <th>Arrival Time</th>
                  <th>Status</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="strong-cell">{item.visitor?.name}</div>
                      <div className="muted-text">{item.visitor?.company}</div>
                    </td>
                    <td>{item.employee?.name}</td>
                    <td>{item.purpose}</td>
                    <td>{item.expectedArrivalTime}</td>
                    <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td>{item.checkInTime ? new Date(item.checkInTime).toLocaleTimeString() : '—'}</td>
                    <td>{item.checkOutTime ? new Date(item.checkOutTime).toLocaleTimeString() : '—'}</td>
                    <td>
                      <div className="action-group">
                        {item.status === 'APPROVED' && (
                          <button className="primary-button" type="button" onClick={() => checkInMutation.mutate(item._id)}>
                            Check-In
                          </button>
                        )}
                        {item.status === 'CHECKED_IN' && (
                          <button className="secondary-button" type="button" onClick={() => checkOutMutation.mutate(item._id)}>
                            Check-Out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
