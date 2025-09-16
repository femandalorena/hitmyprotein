import React, { useState } from "react";
import Button from "./Button";

function Input({ onSubmit }) {
  const [val, setVal] = useState("");

  const handleChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, "");
    setVal(v);
  };

  const handleSubmit = () => {
    if (!val) return;
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(Number(val));
    }
    setVal("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={val}
        onChange={handleChange}
        placeholder="Ingresa un valor"
        inputMode="numeric"
        pattern="[0-9]*"
        className="input-field"
      />
      <Button onClick={handleSubmit} type="general">Agregar</Button>
    </div>
  );
}

export default Input;
