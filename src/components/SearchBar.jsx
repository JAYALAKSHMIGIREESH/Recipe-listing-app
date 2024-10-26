import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCuisine } from '../features/recipeSlice';

const SearchBar = ({ setSearchTerm }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    setSearchTerm(input); // Update the search term locally
    dispatch(setCuisine(input)); // Optional: Dispatch the cuisine if needed
    setInput(''); // Clear the input field after search
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by cuisine"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
