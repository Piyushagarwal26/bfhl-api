// src/MyComponent.js
import React from 'react';

const MyComponent = ({ data }) => {
  return (
    <div>
      <h2>Data from Backend:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
