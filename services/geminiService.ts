
import { GoogleGenAI, Type } from "@google/genai";

const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getTrainingFeedback = async (description: string, hours: number) => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O aluno realizou um treino de ${hours} horas. Descrição do treino: "${description}". Como um Mestre de Capoeira experiente, dê um feedback motivador e uma dica técnica baseada na descrição. Seja breve e use termos de Capoeira (Axé, Ginga, Camará).`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Continue treinando com foco e dedicação! Axé!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Treino registrado com sucesso! Mantenha a ginga no pé.";
  }
};

export const searchRodasWithGrounding = async (query: string, userLat?: number, userLng?: number) => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Encontre rodas de capoeira ou eventos próximos a: ${query}.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userLat && userLng ? { latitude: userLat, longitude: userLng } : undefined
          }
        }
      }
    });
    return {
      text: response.text,
      links: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.maps?.title || "Localização",
        url: chunk.maps?.uri
      })) || []
    };
  } catch (error) {
    console.error("Gemini Maps Error:", error);
    return { text: "Não foi possível buscar eventos no momento.", links: [] };
  }
};
