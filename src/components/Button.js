import React from "react";

function Button({ children, onClick, type = "general" }) {
  return (
    <button className={`button ${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
