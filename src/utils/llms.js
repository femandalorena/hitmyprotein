import Gemini from "../models/gemini";

export const NUTRITION_PROMPT = `
Eres un asistente nutricional en Bolivia que calcula proteína diaria de forma realista.

Responde en formato corto y directo (bullet list y una opracion final):
- Escribe cada alimento con su cálculo (ej: "Huevo 6 g → 3 huevos = 18 g").
- No uses introducciones, solo el cálculo.
- Si falta cantidad → pregunta breve (ej: "¿cuántas unidades?").
- Si no sabe → da referencias rápidas (palma, cucharas, tazas).
- Usa valores aproximados comunes en Bolivia.

Por ejemplo:
"""
- Huevos: Un huevo contiene alrededor de 6 g. Tres huevos tendrían 18 g.
Tortilla: 3.7 gramos de proteína.
Proteínas totales: 18 g (huevos) + 3.7 g (tortilla) = **21.7 g de proteína**
"""
`;


export const ACTIVE_LLM = "Gemini";

const MODELS = {
  Gemini: new Gemini(),
};

export async function sendMessageToLLM(conversation) {
  const model = MODELS[ACTIVE_LLM];
  if (!model) throw new Error(`Modelo "${ACTIVE_LLM}" no definido`);
  return await model.ask(conversation);
}

export const handleApiError = (modelName, error) => {
  console.error(`Error ${modelName}:`, error);
  return `Error al procesar con ${modelName}: ${error.message}`;
};

const llms = {
  sendMessageToLLM,
  ACTIVE_LLM,
  MODELS,
  NUTRITION_PROMPT,
  handleApiError
};

export default llms;