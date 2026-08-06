export const ConfirmDialog = ({ open, title, message, onConfirm, onClose, isSubmitting }) => {
  if (!open) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card compact-card">
        <h3>{title}</h3>
        <p className="muted">{message}</p>
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="danger-button" type="button" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? 'Cancelling...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}
