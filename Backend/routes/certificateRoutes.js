import express from 'express';
import {
  addCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// CRUD Routes
router.post('/', protect, addCertificate);                // Add
router.get('/', protect, getAllCertificates);            // Get all
router.get('/:id', getCertificateById);         // Get single
router.put('/:id', protect, updateCertificate);          // Update
router.delete('/:id', protect, deleteCertificate);       // Delete

export default router;