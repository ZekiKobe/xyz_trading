import React, { useState } from "react";
import { Plus } from "lucide-react"; // Importing Plus Icon

const Identity = () => {
  const [documentType, setDocumentType] = useState("Identity Card");
  const [realName, setRealName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [frontImage, setFrontImage] = useState("/uploadFront.jpg"); // Default image
  const [backImage, setBackImage] = useState("/uploadBack.png"); // Default image

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "front") setFrontImage(imageUrl);
      else setBackImage(imageUrl);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg w-full max-w-3xl mx-auto text-white">
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
              <img src={frontImage} alt="Front" className="w-full h-full object-cover rounded-lg" />
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
              <img src={backImage} alt="Back" className="w-full h-full object-cover rounded-lg" />
              <Plus className="absolute text-white bg-gray-800 p-1 rounded-full" size={24} />
            </label>
            <p className="text-center text-gray-400 text-sm mt-2">Back</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg">
        Submit
      </button>
    </div>
  );
};

export default Identity;
