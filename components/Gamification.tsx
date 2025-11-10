import React from 'react';
import type { Medal } from '../types';

interface GamificationProps {
  points: number;
  unlockedMedals: Medal[];
}

const MedalItem: React.FC<{ medal: Medal }> = ({ medal }) => {
  return (
    <li className="flex items-center gap-4 p-3 rounded-lg bg-gray-100 animate-fade-in">
      <div className="p-2 rounded-full bg-gray-200">
        {medal.icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-base">{medal.name}</h4>
        <p className="text-sm text-gray-600">{medal.description}</p>
      </div>
    </li>
  );
};

export const Gamification: React.FC<GamificationProps> = ({ points, unlockedMedals }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
      <h3 className="text-3xl font-bold text-gray-800 mb-2">Sua Jornada</h3>
      <div className="text-center bg-gray-100 border border-gray-200 p-4 rounded-lg mb-6">
        <p className="text-lg font-bold text-gray-800">Pontos de Inspiração</p>
        <p className="text-6xl font-black text-black">{points}</p>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Medalhas Desbloqueadas</h3>
      {unlockedMedals.length > 0 ? (
        <ul className="space-y-3">
          {unlockedMedals.map((medal) => (
            <MedalItem 
              key={medal.name} 
              medal={medal} 
            />
          ))}
        </ul>
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-600 text-base">Gere sua primeira ilustração para começar a ganhar medalhas!</p>
        </div>
      )}
    </div>
  );
};