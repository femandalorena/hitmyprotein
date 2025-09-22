import BaseModel from "./base/BaseModel";

export default class Gemini extends BaseModel {
  constructor() {
    super("Gemini", "REACT_APP_GEMINI_KEY");
    this.baseURL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  }

  async ask(conversation) {
    const url = `${this.baseURL}?key=${this.apiKey}`;

    // Prepend the nutrition prompt to the first user message
    const contents = conversation.map((msg, idx) => {
      let text = msg.text;
      if (idx === 0 && msg.type === "user") {
        text = `${this.promptBase}\n\n${text}`;
      }
      return {
        role: msg.type === "user" ? "user" : "model",
        parts: [{ text }],
      };
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 150, 
        },
      }),
    };

    const responseParser = (data) => {
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return responseText
        ? responseText.trim()
        : "No se obtuvo respuesta de Gemini";
    };

    return this.makeApiRequest(url, options, responseParser);
  }
}
