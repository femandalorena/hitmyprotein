import React from "react";
import { motion } from "framer-motion";
import "../styles/Thermometer.css";

function Thermometer({ current, max }) {
  const percentage = max > 0 ? Math.min(100, (current / max) * 100) : 0;

  return (
    <div className="thermometer-container">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="thermometer-fill"
      />
    </div>
  );
}

export default Thermometer;
