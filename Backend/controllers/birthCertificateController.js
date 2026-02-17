import BirthCertificate from "../models/birthCertificateModel.js";

// Create Certificate
export const createCertificate = async (req, res) => {
  try {
    const certificate = await BirthCertificate.create(req.body);

    res.status(201).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await BirthCertificate.find();

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Certificate by ID
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await BirthCertificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Certificate
export const updateCertificate = async (req, res) => {
  try {
    const certificate = await BirthCertificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Certificate
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await BirthCertificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};