import { handleApiError, NUTRITION_PROMPT } from "../../utils/llms";

export default class BaseModel {
  constructor(modelName, envKey) {
    this.modelName = modelName;

    if (!process.env[envKey]) {
      throw new Error(`Debes definir ${envKey} en .env`);
    }

    this.apiKey = process.env[envKey];
    this.promptBase = NUTRITION_PROMPT;
  }

  async ask(userPrompt) {
    throw new Error("Method 'ask()' must be implemented");
  }

  async makeApiRequest(url, options, responseParser) {
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch {}
        throw new Error(errorData.error?.message || res.status);
      }

      const data = await res.json();
      return responseParser(data);
    } catch (err) {
      return handleApiError(this.modelName, err);
    }
  }
}
