import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    // Note: In a real production app, ensure this key is secure or proxied via backend.
    // For this demo, we assume process.env.API_KEY is available.
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const generateBotResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    const client = getAIClient();
    
    // Create a context-aware system instruction
    const systemInstruction = `
      You are an AI assistant for ${PORTFOLIO_DATA.name}'s portfolio website.
      Your goal is to represent ${PORTFOLIO_DATA.name} professionally and answer questions about their skills, experience, and projects based on the provided data.
      
      Here is the portfolio data:
      ${JSON.stringify(PORTFOLIO_DATA)}
      
      Guidelines:
      1. Be polite, professional, and concise.
      2. If asked about contact info, provide the email.
      3. If asked about a specific skill not listed, say you are not sure but they are a fast learner.
      4. Speak in the first person plural (e.g., "We worked on...", "Our skills include...") OR third person ("Alex is experienced in...") as appropriate, but preferably represent Alex directly as a digital avatar. Let's use "I" to represent the digital avatar of Alex.
      5. Keep responses under 100 words unless detailed explanation is requested.
    `;

    const model = "gemini-2.5-flash";
    
    // We use generateContent for a single turn here for simplicity, 
    // but we prepend the history to the prompt or use chat session in a fuller app.
    // To keep it simple and stateless for this service, we will just use a chat session approach.
    
    const chat = client.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history // Pass previous conversation history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I'm sorry, I couldn't generate a response at the moment.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my brain (the API). Please try again later.";
  }
};