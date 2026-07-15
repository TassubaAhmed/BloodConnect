const mongoose = require('mongoose');

const donorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  age: { type: Number, required: true, min: 18, max: 65 },
  weight: { type: Number, required: true, min: 45 },
  department: { type: String, default: '' },
  smokingStatus: {
    type: String,
    enum: ['non-smoker', 'smoker', 'former-smoker'],
    default: 'non-smoker'
  },
  healthCondition: { type: String, enum: ['excellent', 'good', 'fair'], default: 'good' },
  chronicDiseases: { type: String, default: 'None' },
  currentMedication: { type: String, default: 'None' },
  lastDonationDate: { type: Date, default: null },
  availability: {
    type: String,
    enum: ['available', 'emergency-only', 'unavailable'],
    default: 'available'
  },
  totalDonations: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

donorProfileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('DonorProfile', donorProfileSchema);