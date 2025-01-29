import React, { useState } from 'react';

function Content() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  const [currentGif, setCurrentGif] = useState('rizz-1.gif');

  // Array of API keys using Vite's environment variable syntax
// Array of API keys using Vite's environment variable syntax
const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY,
  import.meta.env.VITE_GEMINI_API_KEY2,
  import.meta.env.VITE_GEMINI_API_KEY3,
];
  console.log('API Keys:', API_KEYS[0]);

  const prompt = "Create a single clever pickup line that directly references the specific traits, interests, or features mentioned in the description. Use wordplay or puns related to their hobbies, characteristics, or what they love. Keep it short, playful, and add 2-3 relevant emojis. Focus only on the details provided in the description. Response should be just the pickup line without any explanations or extra text.";

  const getRandomGif = () => {
    const gifs = ['rizz-1.gif', 'rizz-2.gif'];
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
  };
  


  const formatText = (text) => {
    // Remove any potential formatting markers
    text = text.replace(/<\/?i>/g, '');
    return text.replace(/\*\*/g, '');
  };

  const handleGenerate = async () => {
    setCurrentGif(getRandomGif());
    if (!inputText.trim()) {
      setError('Please enter some text first');
      return;
    }
  
    setLoading(true);
    setError('');
    setGeneratedText('');
  
    let attempts = 0;
  
    while (attempts < API_KEYS.length) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEYS[currentKeyIndex]}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${prompt}\n${inputText}`
                }]
              }]
            })
          }
        );
  
        if (response.status === 403) {
          setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % API_KEYS.length);
          attempts++;
          continue;
        } 
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
          setGeneratedText(formatText(data.candidates[0].content.parts[0].text));
          setLoading(false);
          return;
        } else {
          throw new Error('No text was generated.');
        }
  
      } catch (error) {
        console.error('Error generating text:', error);
        if (attempts === API_KEYS.length - 1) {
          setError('Failed to generate text. Please try again.');
        }
        attempts++;
      }
    }
  
    if (attempts === API_KEYS.length) {
      setError('All API keys have been exhausted. Please try again later.');
    }
  
    setLoading(false);
  };
  return (
    <div className="h-auto flex items-center justify-center bg-[#0f1015] p-4">


      <div className="w-full max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-[#c1ff72] font-bold text-center mb-5">
          Pickup Line Generator ✨
        </h1>
  
        {/* Main Content Container */}
        <div className="space-y-8">
          {/* Textarea */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your crush (she's a 10, loves football....)"
            className="w-full h-40 md:h-48 bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-lg transition-all"
          />
          
          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full md:w-auto bg-transparent border-2 border-[#c1ff72] text-[#c1ff72] px-12 py-3 rounded-full hover:bg-[#c1ff72] hover:text-black transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate ✨'}
            </button>
          </div>
  
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}
  
          {/* Generated Text Box */}
          {generatedText && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold text-[#c1ff72] mb-4 text-center">
                Your Pickup Line
              </h2>
              
              <div className="bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500">
                <p className="text-lg md:text-xl text-center leading-relaxed">
                  {generatedText}
                </p>
                
                <div className="flex justify-center mt-6">
                  
                <img 
                src={`/images/${currentGif}`}
                alt="Rizz"
                className="w-48 h-48 md:w-64 md:h-60 object-cover rounded shadow-lg" 
                />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;



