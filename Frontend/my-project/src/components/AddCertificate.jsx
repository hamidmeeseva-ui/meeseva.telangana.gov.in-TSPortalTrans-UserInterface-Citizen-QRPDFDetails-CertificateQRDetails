import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Header from './Header';

const AddCertificate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    applicationNo: '',
    name: '',
    fatherOrHusbandName: '',
    residingYears: '',
    purpose: '',
    doorNo: '',
    locality: '',
    district: '',
    mandal: '',
    village: '',
    approvedDate: '',
    approvedBy: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/certificates', form);
    navigate('/dashboard');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        >
          <h2 className="text-xl font-bold mb-4">Add Certificate</h2>
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type={key === 'approvedDate' ? 'date' : 'text'}
              name={key}
              value={form[key]}
              placeholder={key}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
          ))}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add Certificate
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCertificate;