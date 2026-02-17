import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import QRCode from "qrcode";

const Dashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchCertificates = async () => {
    try {
      // Fetch residence certificates
      const resResidence = await axiosInstance.get('/certificates');
      const residenceData = resResidence.data; // <-- your backend returns { success, count, data }

      // Fetch birth certificates
      const resBirth = await axiosInstance.get('/certificates/birth-certificates');
      const birthData = resBirth.data.data;

      // Merge both arrays
      const merged = [...residenceData, ...birthData];

      setCertificates(merged);
    } catch (error) {
      console.log("Error fetching certificates:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      // Use different endpoints depending on type
      if (type === 'birth') {
        await axiosInstance.delete(`/certificates/birth-certificates/${id}`);
      } else {
        await axiosInstance.delete(`/certificates/${id}`);
      }
      setCertificates(certificates.filter((c) => c._id !== id));
    }
  };

  const handleEdit = (id, type) => {
    if (type === "birth") {
      navigate(`/birth-certificate/edit-certificate/${id}`);
    } else {
      navigate(`/edit-certificate/${id}`);
    }
  };

  const handleDownloadQR = async (certificate) => {
    try {
      let url;

      if (certificate.dateOfBirth) {
        // Birth Certificate URL
        url = `https://meeseva-telangana-gov-in-tsportaltrans.onrender.com/BirthCertificateQRDetails/${certificate._id}`;
      } else {
        // Residence Certificate URL
        url = `https://meeseva-telangana-gov-in-tsportaltrans.onrender.com/ResidenceCertificateQRDetails/${certificate._id}`;
      }

      // Generate QR as data URL
      const qrDataUrl = await QRCode.toDataURL(url);
      console.log(qrDataUrl)
      // Create download link
      const link = document.createElement("a");
      link.href = qrDataUrl;
      link.download = `${certificate?.applicationNo}_QR.png`;
      link.click();

    } catch (error) {
      console.error("Error generating QR:", error);
    }
  };

  const handleLogout = async () => {
    await axiosInstance.post('/auth/logout');
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <div className='flex gap-4'>
        <Link
          to="/add-certificate"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
        >
          Add Certificate Residence
        </Link>

        <Link
          to="/birth-certificates/add-certificate"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
        >
          Add Certificate Birth
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Application No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-2">{c.applicationNo}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.dateOfBirth ? "Birth Certificate" : "Residence Certificate"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(c._id, c.dateOfBirth ? "birth" : "residence")}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDownloadQR(c)}
                    className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600"
                  >
                    Download QR Code
                  </button>
                  <button
                    onClick={() => handleDelete(c._id, c.dateOfBirth ? "birth" : "residence")}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;