import React, { useState } from 'react';

function Content() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    setGeneratedText(inputText); // Set generated text to the input value
  };

  return (
    <div className="w-full flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-5xl">
        {/* Textarea */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full h-64 bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-8 resize-none text-lg md:text-xl"
        />
        
        {/* Generate Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={handleGenerate}
            className="bg-transparent border-2 border-[#c1ff72] text-[#c1ff72] px-8 py-3 rounded-full hover:bg-[#c1ff72] hover:text-black transition-all duration-300 text-lg md:text-xl font-semibold"
          >
            Generate ✨
          </button>
        </div>

        {/* Generated Text Box */}
        {generatedText && (
          <div className="w-full bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 mt-8">
            <h2 className="text-xl font-semibold text-center text-[#c1ff72] mb-4">Generated Text</h2>
            <p className="text-lg">{generatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
