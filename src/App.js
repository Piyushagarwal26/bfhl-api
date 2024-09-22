import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Parse the JSON input
      const jsonInput = JSON.parse(inputData);

      // Call the backend API
      const response = await axios.post('https://bfhl-api-seven.vercel.app/', jsonInput);

      // Set the response data
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or API call failed');
      setResponseData(null);
    }
  };

  const handleOptionChange = (event) => {
    const { value } = event.target;
    const updatedOptions = [...selectedOptions];
    
    // Toggle the selected option
    if (updatedOptions.includes(value)) {
      setSelectedOptions(updatedOptions.filter(option => option !== value));
    } else {
      updatedOptions.push(value);
      setSelectedOptions(updatedOptions);
    }
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <input
        type="text"
        placeholder="Enter JSON data"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handleSubmit}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <label>Select Filter:</label>
          <select multiple onChange={handleOptionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="lowercase">Highest Lowercase Alphabet</option>
          </select>

          {/* Render based on the selected options */}
          {selectedOptions.includes('alphabets') && <p>Alphabets: {responseData.alphabets}</p>}
          {selectedOptions.includes('numbers') && <p>Numbers: {responseData.numbers}</p>}
          {selectedOptions.includes('lowercase') && <p>Highest Lowercase: {responseData.lowercase}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
