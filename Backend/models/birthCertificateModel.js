import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    fatherOrHusbandName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNo: {
      type: String,
      required: true,
      trim: true,
    },
    addressAtBirth: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const BirthCertificate = mongoose.model("BirthCertificate", certificateSchema);

export default BirthCertificate;