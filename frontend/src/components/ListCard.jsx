import React from "react";
import "./style.css";

const ListCard = ({ ModelName }) => {
  const trimmedFileName = (filename) => {
    const TrimmedFileName = filename.replace(/\.[^/.]+$/, "");
    return TrimmedFileName;
  };
  return (
    <div className="list-card cursor-pointer">
      <h2>3D Model</h2>
      <h1>{trimmedFileName(ModelName)}</h1>
    </div>
  );
};

export default ListCard;
