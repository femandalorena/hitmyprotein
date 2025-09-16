import React from "react";

function Button({ children, onClick, type = "primary" }) {
  return (
    <button className={`button button-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
