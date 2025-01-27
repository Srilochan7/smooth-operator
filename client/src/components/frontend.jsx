import React, { useState } from 'react';

const App = () => {
  const [inputText, setInputText] = useState('');
  
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start p-60">
      {/* Title Section */}
      <div className="w-full max-w-5xl">
        <h1 className="text-[#c1ff72] text-6xl md:text-7xl font-bold mb-6">
          Smooth Operator
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-300 text-lg mb-12 items-center">
        Smooth-Operator is your AI wingman, turning crush descriptions into witty, personalized pickup lines. 
          <span className="mx-2">👾</span> 
          Funny, flirty, or romantic—leave the perfect impression every time! 
          <span className="mx-2">💯</span>
        </p>
      </div>
      
      {/* Main Content */}
      <div className="w-full max-w-5xl">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full h-64 bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-8 resize-none text-lg"
        />
        
        {/* Generate Button */}
        <div className="flex justify-center mb-16">
          <button className="bg-transparent border-2 border-[#c1ff72] text-[#c1ff72] px-12 py-4 rounded-full hover:bg-[#c1ff72] hover:text-black transition-all duration-300 text-xl font-semibold">
            Generate ✨
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full max-w-5xl text-center">
        <p className="text-gray-400 text-lg mb-2">Thanks for visiting!</p>
        <p className="text-gray-400 text-lg mb-6">Rinkit & Arnab made this</p>
        
        <div className="flex gap-6 justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Github
          </a>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors text-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow Me
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;