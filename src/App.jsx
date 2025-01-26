import { useState } from 'react'
import "./index.css";

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const handleSubmit = () => {
    setOutputText(inputText)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Smooth Operator</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type something..."
        />
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
        {outputText && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-gray-800">{outputText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App