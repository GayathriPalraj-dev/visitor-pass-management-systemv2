import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    idProofNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
  },
  { timestamps: true },
)

export const Visitor = mongoose.model('Visitor', visitorSchema)
