import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth.js'
import { visitorService } from '../../services/visitorService.js'
import { VisitorFormDialog } from '../../components/dialogs/VisitorFormDialog.jsx'
import { VisitorDetailsDialog } from '../../components/dialogs/VisitorDetailsDialog.jsx'
import { ConfirmDialog } from '../../components/dialogs/ConfirmDialog.jsx'

const roleLabels = {
  ADMIN: 'Admin',
  RECEPTIONIST: 'Receptionist',
  EMPLOYEE: 'Employee',
}

export const VisitorsPage = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [detailsVisitor, setDetailsVisitor] = useState(null)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [editingVisitor, setEditingVisitor] = useState(null)

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ['visitors', search, status, date],
    queryFn: () => visitorService.list({ search, status, date }),
  })

  const createMutation = useMutation({
    mutationFn: (payload) => visitorService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['visitors'] })
      await queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] })
      await queryClient.invalidateQueries({ queryKey: ['receptionist-visitors'] })
      toast.success('Visitor registered successfully')
      setIsFormOpen(false)
      setEditingVisitor(null)
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Registration failed')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => visitorService.update(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['visitors'] })
      toast.success('Visitor updated successfully')
      setIsFormOpen(false)
      setEditingVisitor(null)
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Update failed')
    },
  })

  const cancelMutation = useMutation({
    mutationFn: (id) => visitorService.cancel(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['visitors'] })
      await queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] })
      await queryClient.invalidateQueries({ queryKey: ['receptionist-visitors'] })
      toast.success('Visitor cancelled successfully')
      setCancelTarget(null)
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Cancellation failed')
    },
  })

  const canManage = user?.role === 'ADMIN' || user?.role === 'RECEPTIONIST'

  const list = useMemo(() => data || [], [data])

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1>Visitor Registration</h1>
        </div>
        <div className="topbar-actions">
          {canManage && (
            <button className="primary-button" type="button" onClick={() => setIsFormOpen(true)}>
              Register Visitor
            </button>
          )}
        </div>
      </header>

      <section className="card panel">
        <div className="filters">
<input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search visitor, employee or status"
          />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CHECKED_IN">CHECKED_IN</option>
            <option value="CHECKED_OUT">CHECKED_OUT</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} title="Filter by visit date" />
        </div>

        {isLoading && <div className="state-card">Loading visitors...</div>}
        {isError && <div className="state-card error-state">{error?.response?.data?.message || 'Unable to load visitors.'}</div>}

        {!isLoading && !isError && list.length === 0 && (
          <div className="state-card">No visitors found for the current filters.</div>
        )}

        {!isLoading && !isError && list.length > 0 && (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Employee</th>
                  <th>Visit Date</th>
                  <th>Time</th>
                  <th>Status</th>
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
                    <td>
                      <div className="strong-cell">{item.employee?.name}</div>
                      <div className="muted-text">{roleLabels[item.employee?.designation] || item.employee?.department}</div>
                    </td>
                    <td>{new Date(item.visitDate).toLocaleDateString()}</td>
                    <td>{item.expectedArrivalTime}</td>
                    <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td>
                      <div className="action-group">
                        <button className="link-button" type="button" onClick={() => setDetailsVisitor(item)}>
                          Details
                        </button>
                        {canManage && (
                          <>
                            <button className="link-button" type="button" onClick={() => { setEditingVisitor(item); setIsFormOpen(true) }}>
                              Edit
                            </button>
                            <button className="link-button danger" type="button" onClick={() => setCancelTarget(item)}>
                              Cancel
                            </button>
                          </>
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

      <VisitorFormDialog
        open={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingVisitor(null) }}
        initialValues={editingVisitor}
        onSubmit={(values) => {
          const payload = {
            visitor: {
              name: values.visitorName,
              phone: values.phone,
              email: values.email,
              company: values.company,
              idProofNumber: values.idProofNumber,
            },
            employee: values.employee,
            purpose: values.purpose,
            visitDate: values.visitDate,
            expectedArrivalTime: values.expectedArrivalTime,
            remarks: values.remarks || '',
          }

          if (editingVisitor) {
            updateMutation.mutate({ id: editingVisitor._id, payload })
          } else {
            createMutation.mutate(payload)
          }
        }}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <VisitorDetailsDialog item={detailsVisitor} onClose={() => setDetailsVisitor(null)} />

      <ConfirmDialog
        open={Boolean(cancelTarget)}
        title="Cancel visitor request"
        message="This will mark the selected visitor request as cancelled."
        onConfirm={() => cancelMutation.mutate(cancelTarget._id)}
        onClose={() => setCancelTarget(null)}
        isSubmitting={cancelMutation.isPending}
      />
    </main>
  )
}
