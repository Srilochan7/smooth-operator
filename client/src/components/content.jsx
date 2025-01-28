import React, { useState } from 'react';

function Content() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  // Array of API keys using Vite's environment variable syntax
  const API_KEYS = [
    import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY,
    import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY,
    import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY,
  ];
  console.log('API Keys:', API_KEYS);

  const prompt = "You are an AI that creates ONE-LINE pickup lines based on the user's descriptions of their crush. Match the tone—funny, flirty, or romantic—while keeping it short, punchy, and clever. Use witty wordplay and add 2-3 emojis to enhance the vibe. Only respond with a perfect pickup line tailored to the user's description, without long explanations or extra text ";

  const formatText = (text) => {
    // Remove any potential formatting markers
    text = text.replace(/<\/?i>/g, '');
    return text.replace(/\*\*/g, '');
  };

  const handleGenerate = async () => {
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
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          if (data.candidates && data.candidates.length > 0) {
            setGeneratedText(formatText(data.candidates[0].content.parts[0].text));
            return; // Exit the loop on success
          } else {
            setError('No text was generated.');
            return; // Exit the loop on failure
          }
        }
      } catch (error) {
        console.error('Error generating text:', error);
        setError('Failed to generate text. Please try again.');
        return; // Exit the loop on error
      }
    }
  
    if (attempts === API_KEYS.length) {
      setError('All API keys have been exhausted. Please try again later.');
    }
  
    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-5xl">
        {/* Textarea */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe your crush (she's a 20, loves football....)"
          className="w-full h-64 bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-8 resize-none text-lg md:text-xl"
        />
        
        {/* Generate Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-transparent border-2 border-[#c1ff72] text-[#c1ff72] px-8 py-3 rounded-full hover:bg-[#c1ff72] hover:text-black transition-all duration-300 text-lg md:text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate ✨'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Generated Text Box */}
        {generatedText && (
          <div>
            <div>
              <h2 className="text-xl font-semibold text-[#c1ff72] mb-4">Generated Text</h2>
            </div>
            
            <div className="w-full bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 mt-8">
              <p className="text-lg">{generatedText}</p>
              
              {/* Added GIF in card size */}
              <img 
                src="/images/rizz.gif" 
                alt="Rizz"
                className="w-64 h-60 object-cover rounded mt-4" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;