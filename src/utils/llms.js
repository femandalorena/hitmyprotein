import Gemini from "../models/gemini";

export const NUTRITION_PROMPT = `Eres un asistente nutricional. Recibes la descripción de la comida de un usuario y devuelves la cantidad aproximada de proteínas en gramos de esa comida, de manera clara y concisa. No agregues explicaciones largas, solo la información necesaria, con el gramaje por comida.`;

export const ACTIVE_LLM = "Gemini";

const MODELS = {
  Gemini: new Gemini(),
};

export async function sendMessageToLLM(userPrompt) {
  const model = MODELS[ACTIVE_LLM];
  if (!model) throw new Error(`Modelo "${ACTIVE_LLM}" no definido`);
  return await model.ask(userPrompt);
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