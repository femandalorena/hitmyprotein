import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import fireAnimation from "../assets/fire.json";
import "../styles/Thermometer.css";

function Thermometer({ current = 0, min = 0, max = 1, lastAdded = 0 }) {
  const safeMax = max > 0 ? max : 1;
  const clampedCurrent = Math.min(current, max);
  const percentage = (clampedCurrent / safeMax) * 100;

  // contador con color
  const counterColor =
    clampedCurrent >= max
      ? "naranja"
      : clampedCurrent >= max - 15
      ? "naranja"
      : clampedCurrent < min
      ? "celeste"
      : "verde";

  const counterText = (
    <span className={counterColor}>
      {clampedCurrent} / {max}g
    </span>
  );

  // divisiones
  const divisions = 6;
  const step = max / divisions;
  const labels = Array.from({ length: divisions + 1 }).map((_, i) =>
    Math.round(i * step)
  );
  const middleLabels = labels.slice(1, -1);

  // sub-divisiones menores
  const minorDivisions = 4;
  const minorLines = [];
  for (let i = 0; i < divisions; i++) {
    for (let j = 1; j < minorDivisions; j++) {
      const value = labels[i] + (step / minorDivisions) * j;
      if (value > 0 && value < max) minorLines.push(value);
    }
  }

  const fillGradient =
    clampedCurrent >= max - 15
      ? `linear-gradient(to top, var(--celeste), var(--verde) ${
          ((max - 15) / max) * 100
        }%, var(--naranja) 100%)`
      : `linear-gradient(to top, var(--celeste), var(--verde))`;

  const [showFire, setShowFire] = useState(false);

  useEffect(() => {
    if (lastAdded > 20) {
      setShowFire(true);
    }
  }, [lastAdded]);

  return (
    <div className="thermometer-wrapper">
      {/* Contador + fuego en la misma línea */}
      <div className="thermometer-counter-wrapper">
        <div className="thermometer-counter">{counterText}</div>
        {showFire && (
          <div className="fire-animation">
            <Lottie
              animationData={fireAnimation}
              loop={true}
              style={{ width: 40, height: 40 }}
            />
          </div>
        )}
      </div>

      <div className="thermometer-container-wrapper">
        <div className="labels-wrapper">
          {middleLabels.map((label, i) => (
            <div
              key={i}
              className="label"
              style={{ bottom: `${(label / max) * 100}%` }}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="thermometer-container">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="thermometer-fill"
            style={{ background: fillGradient }}
          />

          <div className="thermometer-lines">
            {middleLabels.map((label, i) => (
              <div
                key={i}
                className="thermometer-line-wrapper"
                style={{ bottom: `${(label / max) * 100}%` }}
              >
                <div className="thermometer-line" style={{ width: "18px" }} />
              </div>
            ))}

            {minorLines.map((val, i) => (
              <div
                key={`minor-${i}`}
                className="thermometer-line-wrapper minor"
                style={{ bottom: `${(val / max) * 100}%` }}
              >
                <div
                  className="thermometer-line"
                  style={{ width: "8px", opacity: 0.6 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thermometer;
