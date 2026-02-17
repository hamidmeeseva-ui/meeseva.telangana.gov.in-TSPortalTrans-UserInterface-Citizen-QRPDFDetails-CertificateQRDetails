import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Header from "./Header";

const AddBirthCertificate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    applicationNo: "",
    name: "",
    dateOfBirth: "",
    placeOfBirth: "",
    fatherOrHusbandName: "",
    motherName: "",
    registrationNo: "",
    addressAtBirth: "",
    permanentAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/certificates/birth-certificates/", form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding certificate:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        >
          <h2 className="text-xl font-bold mb-4">Add Birth Certificate</h2>

          <input
            type="text"
            name="applicationNo"
            placeholder="Application No"
            value={form.applicationNo}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Child Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={form.placeOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="fatherOrHusbandName"
            placeholder="Father / Husband Name"
            value={form.fatherOrHusbandName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="motherName"
            placeholder="Mother Name"
            value={form.motherName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="registrationNo"
            placeholder="Registration No"
            value={form.registrationNo}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="addressAtBirth"
            placeholder="Address at Birth"
            value={form.addressAtBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <input
            type="text"
            name="permanentAddress"
            placeholder="Permanent Address"
            value={form.permanentAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Birth Certificate
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBirthCertificate;