export function calculateProteinNeeds(weight, goalWinMuscle) {
  if (!weight) return { min: 0, max: 0 };

  // mantenimimento: 1.2–1.6 g/kg
  // ganar masa: 1.6–2.2 g/kg
  const min = goalWinMuscle ? weight * 1.6 : weight * 1.2;
  const max = goalWinMuscle ? weight * 2.2 : weight * 1.6;

  return { min: Math.round(min), max: Math.round(max) };
}
