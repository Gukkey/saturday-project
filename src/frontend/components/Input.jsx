import React from "react";

function Input({ label, name, onChange = () => {}, className = "" }) {
  return (
    <div className={`flex flex-row gap-2 ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        className="border-black border-2 rounded outline-none"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
