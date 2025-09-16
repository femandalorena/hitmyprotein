import React, { useEffect, useState } from "react";
import Thermometer from "../components/Thermometer";
import Input from "../components/Input";
import ThemeModal from "../components/modals/ThemeModal";
import GoalModal from "../components/modals/GoalModal";
import InfoModal from "../components/modals/InfoModal";
import CongratsModal from "../components/modals/CongratsModal";
import TrackerModal from "../components/modals/TrackerModal";
import { FaRobot } from "react-icons/fa";
import { calculateProteinNeeds } from "../utils/calculator";
import "../styles/Main.css";
import "../styles/Modal.css";

function Main() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [goalWinMuscle, setGoalWinMuscle] = useState(null);
  const [showGoal, setShowGoal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [needs, setNeeds] = useState({ min: 0, max: 0 });
  const [showCongrats, setShowCongrats] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [protein, setProtein] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("proteinData"));
    const today = new Date().toISOString().split("T")[0];
    if (saved && saved.date === today) return saved.value;
    return 0;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    const savedGoal = localStorage.getItem("goalWinMuscle");
    const savedData = localStorage.getItem("userData");

    if (savedTheme === null) setShowTheme(true);
    else setDarkMode(savedTheme === "true");

    if (!savedGoal) setShowGoal(true);
    else setGoalWinMuscle(savedGoal === "true");

    if (!savedData) setShowInfo(true);
    else setUserData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  useEffect(() => {
    if (userData && goalWinMuscle !== null) {
      setNeeds(calculateProteinNeeds(userData.weight, goalWinMuscle));
    }
  }, [userData, goalWinMuscle]);

  const handleThemeSave = (mode) => {
    setDarkMode(mode);
    localStorage.setItem("darkMode", mode);
    setShowTheme(false);
    setShowGoal(true);
  };

  const handleSaveGoal = (value) => {
    setGoalWinMuscle(value);
    localStorage.setItem("goalWinMuscle", value);
    setShowGoal(false);
    setShowInfo(true);
  };

  const handleSaveInfo = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setShowInfo(false);
  };

  const handleAddProtein = (grams) => {
    const newTotal = protein + grams;
    setProtein(newTotal);
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("proteinData", JSON.stringify({ value: newTotal, date: today }));

    if (goalWinMuscle && newTotal >= needs.min && newTotal < needs.max) setShowCongrats("min");
    else if (newTotal >= needs.max) setShowCongrats("max");
  };

  return (
    <div className="main-container">
      <header style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <h1>HitMyProtein</h1>
      </header>

      <Thermometer current={protein} max={needs.max} />

      <Input onSubmit={handleAddProtein} />

      <div
        className="tracker-button"
        onClick={() => setShowTracker(true)}
      >
        <FaRobot size={28} color="var(--verde)" />
        <span>Calcular las proteínas de tu comida</span>
      </div>

      {showTracker && <TrackerModal onClose={() => setShowTracker(false)} />}
      {showTheme && <ThemeModal onSave={handleThemeSave} />}
      {showGoal && <GoalModal onSave={handleSaveGoal} />}
      {showInfo && (
        <InfoModal
          defaultHeight={userData?.height}
          defaultWeight={userData?.weight}
          onSave={handleSaveInfo}
        />
      )}
      {showCongrats && (
        <CongratsModal
          goalWinMuscle={goalWinMuscle}
          reachedMin={showCongrats === "min"}
          reachedMax={showCongrats === "max"}
          onClose={() => setShowCongrats(false)}
        />
      )}
    </div>
  );
}

export default Main;
