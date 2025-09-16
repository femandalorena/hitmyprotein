import React from "react";
import { motion } from "framer-motion";
import Button from "../Button";

class ThemeModal extends React.Component {
  handleClick = (mode) => {
    const { onSave } = this.props;
    if (onSave) onSave(mode);
  };

  render() {
    return (
      <div className="modal-backdrop">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="modal"
        >
          <h2>Selecciona el modo de la app</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={() => this.handleClick(false)}>Diurno</Button>
            <Button onClick={() => this.handleClick(true)}>Nocturno</Button>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default ThemeModal;
