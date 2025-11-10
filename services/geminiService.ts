import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI client directly with process.env.API_KEY as per guidelines,
// removing unnecessary checks and fallbacks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateColoringPage(prompt: string): Promise<string> {
  const fullPrompt = `Página de colorir em preto e branco para crianças, estilo Bobbie Goods (linhas grossas e simples), fofo e adorável. A ilustração deve ser de: ${prompt}. Linhas limpas, sem sombreamento, fundo branco.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("A resposta da API não continha dados de imagem.");
    }
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    throw new Error("Não foi possível gerar a ilustração. Tente novamente.");
  }
}
