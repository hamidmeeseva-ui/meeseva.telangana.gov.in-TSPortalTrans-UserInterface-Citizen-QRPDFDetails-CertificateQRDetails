import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check', (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ userId: decoded.id });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

export default router;
