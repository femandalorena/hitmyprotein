import React from "react";
import { motion } from "framer-motion";
import Button from "../Button";

class GoalModal extends React.Component {
  handleClick = (value) => {
    const { onSave } = this.props;
    if (onSave) onSave(value);
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
          <h2>Define tu meta</h2>
          <div className="modal-content-column">
            <Button onClick={() => this.handleClick(true)}>Ganar masa muscular</Button>
            <Button onClick={() => this.handleClick(false)}>Mantener masa muscular</Button>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default GoalModal;
