import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddCertificate from './components/AddCertificate';
import EditCertificate from './components/EditCertificate';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import ResidenceCertificateQRDetails from './components/ResidenceCertificateQRDetails';
import AddBirthCertificate from './components/AddBirthCertificate';
import EditBirthCertificate from './components/EditBirthCertificate';
import BirthCertificateQrDetails from './components/BirthCertificateQrDetails';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-certificate"
            element={
              <ProtectedRoute>
                <AddCertificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/birth-certificates/add-certificate"
            element={
              <ProtectedRoute>
                <AddBirthCertificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-certificate/:id"
            element={
              <ProtectedRoute>
                <EditCertificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/birth-certificate/edit-certificate/:id"
            element={
              <ProtectedRoute>
                <EditBirthCertificate />
              </ProtectedRoute>
            }
          />
          <Route path='/ResidenceCertificateQRDetails/:id' element={<ResidenceCertificateQRDetails />} />
          <Route path='/BirthCertificateQRDetails/:id' element={<BirthCertificateQrDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;