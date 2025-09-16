import React from "react";
import { motion } from "framer-motion";
import Button from "../Button";

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: props.defaultWeight || "",
      height: props.defaultHeight || "",
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSubmit = () => {
    const { weight, height } = this.state;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const { onSave } = this.props;

    if (!w || !h) return alert("Debes ingresar peso y altura");
    if (w < 30 || w > 300) return alert("Peso entre 30 y 300 kg");
    if (h < 130 || h > 210) return alert("Altura entre 130 y 210 cm");

    if (onSave) onSave({ weight: w, height: h });
  };

  render() {
    const { weight, height } = this.state;

    return (
      <div className="modal-backdrop">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="modal"
        >
          <h2>Ingresa tus datos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Peso (kg)"
              value={weight}
              onChange={(e) => this.handleChange("weight", e.target.value)}
              style={{ appearance: "none", MozAppearance: "textfield" }}
            />
            <input
              type="number"
              inputMode="numeric"
              placeholder="Altura (cm)"
              value={height}
              onChange={(e) => this.handleChange("height", e.target.value)}
              style={{ appearance: "none", MozAppearance: "textfield" }}
            />
            <Button onClick={this.handleSubmit}>Guardar</Button>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default InfoModal;
