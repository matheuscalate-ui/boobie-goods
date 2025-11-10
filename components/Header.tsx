import React from 'react';
import { HeartIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-3 mb-2">
        <HeartIcon className="w-8 h-8 text-black" />
        <h1 className="text-5xl md:text-6xl font-black text-black">
          Desenhos Bíblicos
        </h1>
      </div>
      <p className="text-xl text-gray-500">
        Gere ilustrações bíblicas para colorir, com um toque de diversão e criatividade.
      </p>
    </header>
  );
};