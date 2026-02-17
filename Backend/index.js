import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import certificateRoutes from './routes/certificateRoutes.js';
import cookieParser from 'cookie-parser';
import birthCertificateRoutes from './routes/birthCertificateRoutes.js'

const app = express();
app.use(cookieParser());

// Middleware
app.use(cors({
    origin: 'https://meeseva-telangana-gov-in-ts-portal.vercel.app',
    credentials: true
}));

app.use(express.json());

dotenv.config();
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/certificates/birth-certificates', birthCertificateRoutes);
app.use('/api/certificates', certificateRoutes);

// Define port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
