import mongoose from 'mongoose'

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    visitRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VisitRequest',
      required: true,
      index: true,
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: 250,
      default: '',
    },
  },
  { timestamps: true },
)

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema)
