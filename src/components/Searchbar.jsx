import React from 'react';

const Searchbar = ({ onSearchChange }) => {
  return (
    <div className='container-md'>
      <input
        type='text'
        className='form-control'
        placeholder='Search country...'
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <i className='fa-solid fa-magnifying-glass'></i>
    </div>
  );
};

export default Searchbar;
