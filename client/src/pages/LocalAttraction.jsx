import React, { useState } from 'react';

const LocalAttractions = () => {
  const [attractionType, setAttractionType] = useState('Must-Visit Spots');
  const [attractions, setAttractions] = useState({
    'Must-Visit Spots': [],
    'Hidden Gems': [],
    'Cultural Events': [],
  });
  const [newAttraction, setNewAttraction] = useState('');

  const handleAddAttraction = () => {
    if (newAttraction.trim() !== '') {
      setAttractions((prev) => ({
        ...prev,
        [attractionType]: [...prev[attractionType], newAttraction],
      }));
      setNewAttraction('');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Local Attractions</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={attractionType}
          onChange={(e) => setAttractionType(e.target.value)}
        >
          {Object.keys(attractions).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Add Attraction</label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder={`Enter ${attractionType}`}
          value={newAttraction}
          onChange={(e) => setNewAttraction(e.target.value)}
        />
        <button
          onClick={handleAddAttraction}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {Object.entries(attractions).map(([type, items]) => (
        <div key={type} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{type}</h3>
          {items.length > 0 ? (
            <ul className="list-disc pl-5">
              {items.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No attractions added yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LocalAttractions;
