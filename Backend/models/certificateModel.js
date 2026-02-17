import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    applicationNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    fatherOrHusbandName: { type: String, required: true },
    residingYears: { type: Number, required: true },
    purpose: { type: String, required: true },
    doorNo: { type: String, required: true },
    locality: { type: String, required: true },
    district: { type: String, required: true },
    mandal: { type: String, required: true },
    village: { type: String, required: true },
    approvedDate: { type: Date, required: true },
    approvedBy: { type: String, required: true }
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;