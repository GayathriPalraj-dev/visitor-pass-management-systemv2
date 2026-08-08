import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { employeeService } from '../../services/employeeService.js'

const schema = z.object({
  visitorName: z.string().min(1, 'Visitor name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().min(1, 'Company is required'),
  idProofNumber: z.string().min(1, 'ID proof number is required'),
  employee: z.string().min(1, 'Employee is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  visitDate: z.string().min(1, 'Visit date is required'),
  expectedArrivalTime: z.string().min(1, 'Arrival time is required'),
  remarks: z.string().optional(),
})

const emptyValues = {
  visitorName: '',
  phone: '',
  email: '',
  company: '',
  idProofNumber: '',
  employee: '',
  purpose: '',
  visitDate: '',
  expectedArrivalTime: '',
  remarks: '',
}

// Formats a Date (or date string) into the YYYY-MM-DD format expected by <input type="date">,
// using local time so the displayed day never shifts due to UTC conversion.
const formatDateForInput = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const VisitorFormDialog = ({ open, onClose, initialValues, onSubmit, isSubmitting }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: emptyValues,
  })

  const { data: employees = [], isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeService.list(),
    enabled: open,
  })

  useEffect(() => {
    if (!initialValues) {
      reset(emptyValues)
      return
    }

    reset({
      visitorName: initialValues.visitor?.name || '',
      phone: initialValues.visitor?.phone || '',
      email: initialValues.visitor?.email || '',
      company: initialValues.visitor?.company || '',
      idProofNumber: initialValues.visitor?.idProofNumber || '',
      employee: initialValues.employee?._id || '',
      purpose: initialValues.purpose || '',
      visitDate: formatDateForInput(initialValues.visitDate),
      expectedArrivalTime: initialValues.expectedArrivalTime || '',
      remarks: initialValues.remarks || '',
    })
  }, [initialValues, reset])

  if (!open) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Visitor Registration</p>
            <h3>{initialValues ? 'Edit Visitor' : 'Register Visitor'}</h3>
          </div>
          <button className="link-button" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <label>
              Visitor Name
              <input {...register('visitorName')} />
              {errors.visitorName && <span className="field-error">{errors.visitorName.message}</span>}
            </label>
            <label>
              Phone
              <input {...register('phone')} />
              {errors.phone && <span className="field-error">{errors.phone.message}</span>}
            </label>
          </div>

          <div className="form-row">
            <label>
              Email
              <input type="email" {...register('email')} />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </label>
            <label>
              Company
              <input {...register('company')} />
              {errors.company && <span className="field-error">{errors.company.message}</span>}
            </label>
          </div>

          <div className="form-row">
            <label>
              ID Proof Number
              <input {...register('idProofNumber')} />
              {errors.idProofNumber && <span className="field-error">{errors.idProofNumber.message}</span>}
            </label>
            <label>
              Employee
              <select {...register('employee')} disabled={isLoadingEmployees}>
                <option value="">
                  {isLoadingEmployees ? 'Loading employees...' : 'Select employee'}
                </option>
                {employees.map((employee) => (
                  <option value={employee._id} key={employee._id}>
                    {employee.name} — {employee.department}
                  </option>
                ))}
              </select>
              {errors.employee && <span className="field-error">{errors.employee.message}</span>}
            </label>
          </div>

          <div className="form-row">
            <label>
              Purpose
              <input {...register('purpose')} />
              {errors.purpose && <span className="field-error">{errors.purpose.message}</span>}
            </label>
            <label>
              Visit Date
              <input type="date" {...register('visitDate')} />
              {errors.visitDate && <span className="field-error">{errors.visitDate.message}</span>}
            </label>
          </div>

          <div className="form-row">
            <label>
              Expected Arrival Time
              <input type="time" {...register('expectedArrivalTime')} />
              {errors.expectedArrivalTime && <span className="field-error">{errors.expectedArrivalTime.message}</span>}
            </label>
            <label>
              Remarks
              <input {...register('remarks')} />
            </label>
          </div>

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialValues ? 'Update Visitor' : 'Register Visitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
