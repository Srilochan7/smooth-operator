import React, { useState } from 'react';
import axios from 'axios';

function Content() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      // Define a pre-prompt to guide the API response
      const prePrompt = "Translate the following text into a creative story: ";
      const requestData = {
        prompt: prePrompt + inputText, // Combine pre-prompt and user input
        max_tokens: 100,  // Number of tokens (words) to generate in the response
        temperature: 0.7,  // Controls creativity (higher values make it more creative)
      };
    
      // Make API request to the Gemini API endpoint (use your actual endpoint and API key)
      const response = await axios.post('https://api.gemini.com/v1/endpoint', requestData, {
        headers: {
          'Authorization': process.env.REACT_APP_GEMINI_API_KEY, // Replace with your API key
        },
      });
    
      // Set the generated text from the API response
      setGeneratedText(response.data.generated_text);
    } catch (error) {
      console.error('Error generating text:', error); // Log error for debugging
      setError('Failed to generate text. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Stop loading once the API call is complete
    }
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
            className="bg-transparent border-2 border-[#c1ff72] text-[#c1ff72] px-8 py-3 rounded-full hover:bg-[#c1ff72] hover:text-black transition-all duration-300 text-lg md:text-xl font-semibold"
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
                src="images/rizz.gif" 
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