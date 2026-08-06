export const VisitorDetailsDialog = ({ item, onClose }) => {
  if (!item) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Visitor Details</p>
            <h3>{item.visitor?.name}</h3>
          </div>
          <button className="link-button" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="detail-grid">
          <div>
            <span className="detail-label">Phone</span>
            <p>{item.visitor?.phone}</p>
          </div>
          <div>
            <span className="detail-label">Email</span>
            <p>{item.visitor?.email}</p>
          </div>
          <div>
            <span className="detail-label">Company</span>
            <p>{item.visitor?.company}</p>
          </div>
          <div>
            <span className="detail-label">ID Proof</span>
            <p>{item.visitor?.idProofNumber}</p>
          </div>
          <div>
            <span className="detail-label">Employee</span>
            <p>{item.employee?.name}</p>
          </div>
          <div>
            <span className="detail-label">Purpose</span>
            <p>{item.purpose}</p>
          </div>
          <div>
            <span className="detail-label">Visit Date</span>
            <p>{new Date(item.visitDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="detail-label">Arrival Time</span>
            <p>{item.expectedArrivalTime}</p>
          </div>
          <div>
            <span className="detail-label">Status</span>
            <p>{item.status}</p>
          </div>
          <div>
            <span className="detail-label">Remarks</span>
            <p>{item.remarks || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
