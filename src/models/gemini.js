import BaseModel from "./base/BaseModel";

export default class Gemini extends BaseModel {
  constructor() {
    super("Gemini", "REACT_APP_GEMINI_KEY");
    this.baseURL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  }

  async ask(userPrompt) {
    const url = `${this.baseURL}?key=${this.apiKey}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{
              text: `${this.promptBase}\n\n${userPrompt}`
            }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      }),
    };

    const responseParser = (data) => {
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return responseText ? responseText.trim() : "No se obtuvo respuesta de Gemini";
    };

    return this.makeApiRequest(url, options, responseParser);
  }
}