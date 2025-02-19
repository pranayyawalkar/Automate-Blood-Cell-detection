import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import "./Upload.css";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
  };

  return (
    <div className="upload-page">
      <motion.div
        className="upload-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="upload-title">Upload Blood Cell Sample</h2>
        <p className="upload-description">
          Drag & drop a microscopic image or click to select a file.
        </p>

        {/* Upload Box */}
        <motion.div
          className="upload-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <>
              <FiUploadCloud className="upload-icon" size={50} />
              <p>Drag & Drop or Click to Upload</p>
              <label className="upload-label">
                Choose File
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              </label>
            </>
          ) : (
            <div className="uploaded-file">
              <img src={selectedFile} alt="Uploaded Preview" className="preview-image" />
              <p className="file-name">{fileName}</p>
              <button className="remove-button" onClick={handleRemoveFile}>
                <AiOutlineDelete size={20} /> Remove
              </button>
            </div>
          )}
        </motion.div>

        {/* Analyze Button */}
        {selectedFile && (
          <motion.button
            className="analyze-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Analyze Image
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;
