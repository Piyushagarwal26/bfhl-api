import React, { useState } from 'react';
import Select from 'react-select';

const InputForm = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercase', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate JSON
    try {
      const jsonData = JSON.parse(inputData);
      const response = await fetch('https://bfhl-api-seven.vercel.app/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const filteredResponse = () => {
    if (!responseData) return null;
    
    return responseData;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Enter JSON here'
          required
        />
        <button type='submit'>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <Select
          isMulti
          options={options}
          onChange={handleSelectChange}
        />
      )}
      {selectedOptions.length > 0 && (
        <div>
          <h2>Filtered Response:</h2>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InputForm;
