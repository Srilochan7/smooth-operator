import React, { useState } from 'react';

function Content() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [currentGif, setCurrentGif] = useState('rizz-1.gif');

  const API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY2,
    import.meta.env.VITE_GEMINI_API_KEY3,
  ].filter(Boolean); // Remove undefined keys to prevent errors

  const prompt = "Create a single clever pickup line that directly references the specific traits, interests, or features mentioned in the description. Use wordplay or puns related to their hobbies, characteristics, or what they love. Keep it short, playful, and add 2-3 relevant emojis. Response should be just the pickup line without any explanations or extra text.";

  const getRandomGif = () => {
    const gifs = ['rizz-1.gif', 'rizz-2.gif'];
    return gifs[Math.floor(Math.random() * gifs.length)];
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

    for (let i = 0; i < API_KEYS.length; i++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEYS[i]}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${prompt}\n${inputText}` }] }]
            })
          }
        );

        if (response.status === 403) continue; // Skip to the next key
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.candidates?.length) {
          setGeneratedText(data.candidates[0].content.parts[0].text);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error generating text:', error);
      }
    }

    setError('Failed to generate text. Please try again later.');
    setLoading(false);
  };

  return (
    <div className="h-auto flex items-center justify-center bg-[#0f1015] p-4">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-[#c1ff72] font-bold text-center mb-5">
          Pickup Line Generator ✨
        </h1>

        <div className="space-y-8">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your crush (she's a 10, loves football....)"
            className="w-full h-40 md:h-48 bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-lg transition-all"
          />

          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full md:w-auto bg-transparent border-2 border-[#c1ff72] text-[#c1ff72] px-12 py-3 rounded-full hover:bg-[#c1ff72] hover:text-black transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate ✨'}
            </button>
          </div>

          {error && <div className="text-red-500 text-center"><p>{error}</p></div>}

          {generatedText && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold text-[#c1ff72] mb-4 text-center">Your Pickup Line</h2>
              <div className="bg-[#1a1b26] text-white rounded-lg p-6 border border-purple-500">
                <p className="text-lg md:text-xl text-center leading-relaxed">{generatedText}</p>
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