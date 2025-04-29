import React from "react";

function ModelBox({ selectedModel, onModelChange }) {
  return (
    <div className="model-box">
        
        <select
        className="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        >
        <option value="default">Default</option>
        <option value="math">MathPlus</option>
        </select>
    </div>
  );
}

export default ModelBox;