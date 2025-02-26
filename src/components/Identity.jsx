import React, { useState } from "react";
import { Plus } from "lucide-react"; // Importing Plus Icon

const Identity = () => {
  const [documentType, setDocumentType] = useState("Identity Card");
  const [realName, setRealName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [status, setStatus] = useState(""); // State for submission status

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "front") {
        setFrontImage(file);
      } else {
        setBackImage(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert images to base64
    const frontImageBase64 = await convertToBase64(frontImage);
    const backImageBase64 = await convertToBase64(backImage);

    const identityData = {
      documentType,
      realName,
      documentNumber,
      frontImage: frontImageBase64,
      backImage: backImageBase64,
    };

    try {
      const response = await fetch("https://xyztrading-api.onrender.com/api/auth/identity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(identityData),
      });

      if (response.ok) {
        setStatus("pending"); // Set status to pending on successful upload
        alert("Identity document uploaded successfully! Your identity is pending approval.");
      } else {
        alert("Failed to upload identity document.");
      }
    } catch (error) {
      console.error("Error submitting identity document:", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg w-full max-w-3xl mx-auto text-white">
      <form onSubmit={handleSubmit}>
        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Document Type */}
          <div>
            <label className="block text-sm mb-1">Document Type</label>
            <select
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="Identity Card">Identity Card</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
            </select>
          </div>

          {/* Real Name */}
          <div>
            <label className="block text-sm mb-1">Real Name</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded"
              placeholder="Please enter real name"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
            />
          </div>
        </div>

        {/* Document Number */}
        <div className="mt-4">
          <label className="block text-sm mb-1">Document Number</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded"
            placeholder="Please enter document number"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
        </div>

        {/* Upload Section */}
        <div className="mt-4">
          <label className="block text-sm mb-1">Document Photo</label>
          <div className="grid grid-cols-2 gap-4">
            {/* Front Image Upload */}
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="front-upload"
                onChange={(e) => handleFileUpload(e, "front")}
              />
              <label
                htmlFor="front-upload"
                className="block bg-gray-700 p-4 rounded-lg text-center cursor-pointer border border-gray-600 flex items-center justify-center aspect-[4/3]"
              >
                <img src={frontImage ? URL.createObjectURL(frontImage) : "/uploadFront.jpg"} alt="Front" className="w-full h-full object-cover rounded-lg" />
                <Plus className="absolute text-white bg-gray-800 p-1 rounded-full" size={24} />
              </label>
              <p className="text-center text-gray-400 text-sm mt-2">Front</p>
            </div>

            {/* Back Image Upload */}
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="back-upload"
                onChange={(e) => handleFileUpload(e, "back")}
              />
              <label
                htmlFor="back-upload"
                className="block bg-gray-700 p-4 rounded-lg text-center cursor-pointer border border-gray-600 flex items-center justify-center aspect-[4/3]"
              >
                <img src={backImage ? URL.createObjectURL(backImage) : "/uploadBack.png"} alt="Back" className="w-full h-full object-cover rounded-lg" />
                <Plus className="absolute text-white bg-gray-800 p-1 rounded-full" size={24} />
              </label>
              <p className="text-center text-gray-400 text-sm mt-2">Back</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg">
          Submit
        </button>
      </form>

      {/* Pending Status */}
      {status && (
        <div className="mt-4 text-yellow-500">
          <p>Your identity is currently <strong>{status}</strong>.</p>
        </div>
      )}
    </div>
  );
};

export default Identity;