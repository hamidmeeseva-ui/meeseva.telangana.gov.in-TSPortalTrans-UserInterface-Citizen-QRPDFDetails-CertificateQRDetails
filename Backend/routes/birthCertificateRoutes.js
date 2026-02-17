import express from "express";
import {
    createCertificate,
    getAllCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate,
} from "../controllers/birthCertificateController.js";
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", protect, createCertificate);
router.get("/", protect, getAllCertificates);
router.get("/:id", getCertificateById);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

export default router;