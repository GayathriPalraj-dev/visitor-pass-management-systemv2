import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { approvalService } from '../../services/approvalService.js'
import { useAuth } from '../../hooks/useAuth.js'

export const EmployeeApprovalsPage = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [tab, setTab] = useState('pending')
  const [remarks, setRemarks] = useState('')
  const [selected, setSelected] = useState(null)

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ['approvals', tab],
    queryFn: () => (tab === 'pending' ? approvalService.listPending() : approvalService.listHistory()),
  })

  const approveMutation = useMutation({
    mutationFn: ({ id, remarksValue }) => approvalService.approve(id, remarksValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['approvals'] })
      toast.success('Request approved')
      setSelected(null)
      setRemarks('')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Approval failed')
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, remarksValue }) => approvalService.reject(id, remarksValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['approvals'] })
      toast.success('Request rejected')
      setSelected(null)
      setRemarks('')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Rejection failed')
    },
  })

  const list = useMemo(() => data || [], [data])

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Visitor Pass Management</p>
          <h1>Employee Approvals</h1>
        </div>
        <div className="topbar-actions">
          <button className={`secondary-button ${tab === 'pending' ? 'active' : ''}`} type="button" onClick={() => setTab('pending')}>
            Pending
          </button>
          <button className={`secondary-button ${tab === 'history' ? 'active' : ''}`} type="button" onClick={() => setTab('history')}>
            History
          </button>
        </div>
      </header>

      <section className="card panel">
        {isLoading && <div className="state-card">Loading approvals...</div>}
        {isError && <div className="state-card error-state">{error?.response?.data?.message || 'Unable to load approvals.'}</div>}

        {!isLoading && !isError && list.length === 0 && (
          <div className="state-card">No requests available for this view.</div>
        )}

        {!isLoading && !isError && list.length > 0 && (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Company</th>
                  <th>Purpose</th>
                  <th>Visit Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="strong-cell">{item.visitor?.name}</div>
                      <div className="muted-text">{item.employee?.name}</div>
                    </td>
                    <td>{item.visitor?.company}</td>
                    <td>{item.purpose}</td>
                    <td>{new Date(item.visitDate).toLocaleDateString()}</td>
                    <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td>
                      <div className="action-group">
                        {user?.role === 'EMPLOYEE' && tab === 'pending' && (
                          <>
                            <button className="link-button" type="button" onClick={() => { setSelected(item); setRemarks('') }}>
                              Approve
                            </button>
                            <button className="link-button danger" type="button" onClick={() => { setSelected(item); setRemarks('') }}>
                              Reject
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

      {selected && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Approval Action</p>
                <h3>{selected.visitor?.name}</h3>
              </div>
              <button className="link-button" type="button" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
            <label>
              Remarks
              <textarea value={remarks} onChange={(event) => setRemarks(event.target.value)} rows="4" />
            </label>
            <div className="modal-actions">
              <button className="secondary-button" type="button" onClick={() => setSelected(null)}>
                Cancel
              </button>
              <button className="danger-button" type="button" onClick={() => rejectMutation.mutate({ id: selected._id, remarksValue: remarks })}>
                Reject
              </button>
              <button className="primary-button" type="button" onClick={() => approveMutation.mutate({ id: selected._id, remarksValue: remarks })}>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
