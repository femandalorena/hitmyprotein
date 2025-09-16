import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confettiAnimation from "../../assets/confetti.json";
import Button from "../Button";

function CongratsModal({ onClose, goalWinMuscle, reachedMin, reachedMax }) {
  let message = "¡Felicidades! 🎉";

  if (goalWinMuscle) {
    if (reachedMin && !reachedMax) {
      message =
        "Ya cumpliste la base de proteína. Ahora puedes tomarlo más light ";
    } else if (reachedMax) {
      message =
        "¡Lo lograste! Has alcanzado el óptimo de proteína para hoy";
    }
  } else if (reachedMax) {
    message = "Felicidades, has alcanzado tu meta diaria de proteína";
  }

  return (
    <div className="modal-backdrop">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="modal"
        style={{ textAlign: "center" }}
      >
        <Lottie animationData={confettiAnimation} loop={false} style={{ width: 200, height: 200, margin: "0 auto" }} />
        <h2>{message}</h2>
        <Button onClick={onClose}>Cerrar</Button>
      </motion.div>
    </div>
  );
}

export default CongratsModal;
