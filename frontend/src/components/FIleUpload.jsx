// src/components/FileUpload.js
import React, { useState } from "react";
import axios from "../axios";

const FileUpload = ({ onSuccess, getObjListFunction }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("object", file);

    const token = localStorage.getItem("token");
    console.log(token);

    try {
      const response = await axios.post("/api/objects/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
      getObjListFunction();
      // onSuccess(response.data.fileUrl);
      console.log(response.data); // Later we can use this response to display the object
      console.log(response.data.fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" accept=".obj,.glb,.mtl" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file} className="ui-btn ui-wb">
        <span>Upload Model</span>
      </button>
    </div>
  );
};

export default FileUpload;
