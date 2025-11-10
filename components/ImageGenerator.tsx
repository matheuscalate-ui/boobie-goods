import React, { useState } from 'react';
import { generateColoringPage } from '../services/geminiService';
import { BIBLICAL_SCENES } from '../constants';
import { Spinner } from './Spinner';
import { DownloadIcon, SparklesIcon } from './Icons';

export const ImageGenerator: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');

  const handleRandomGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const randomScene = BIBLICAL_SCENES[Math.floor(Math.random() * BIBLICAL_SCENES.length)];
    setLastPrompt(randomScene);

    try {
      const imageUrl = await generateColoringPage(randomScene);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    const filename = (lastPrompt || "ilustracao-biblica").replace(/ /g, '_').toLowerCase();
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="space-y-4">
        <p className="text-center text-gray-600 text-lg">Clique no botão abaixo para criar uma ilustração aleatória!</p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={handleRandomGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
          >
            <SparklesIcon className="w-5 h-5"/>
            Gerar Ilustração Aleatória
          </button>
        </div>
      </div>

      <div className="mt-6 aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
        {isLoading && <Spinner />}
        {error && <p className="text-black font-semibold text-center p-4 text-lg">{error}</p>}
        {generatedImage && !isLoading && (
          <img src={generatedImage} alt={lastPrompt} className="object-contain w-full h-full rounded-lg animate-fade-in" />
        )}
        {!isLoading && !error && !generatedImage && (
          <p className="text-gray-500 text-center p-4 text-lg">Sua ilustração aparecerá aqui.</p>
        )}
      </div>

      {generatedImage && !isLoading && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <DownloadIcon className="w-5 h-5" />
            Baixar PNG
          </button>
        </div>
      )}
    </div>
  );
};
