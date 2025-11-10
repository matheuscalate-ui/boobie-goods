import React from 'react';
import { Header } from './components/Header';
import { ImageGenerator } from './components/ImageGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <main className="mt-10 flex flex-col items-center gap-12">
          <div className="w-full max-w-2xl">
            <ImageGenerator />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
