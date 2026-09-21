import React from "react";

const Form = ({ handleFormSubmit, handleChange, newName, id }) => {
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name"> name: </label>
          <input
            type="text"
            onChange={handleChange}
            value={newName.name}
            name="name"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            type="text"
            onChange={handleChange}
            value={newName.number}
            name="number"
            id="number"
          />
        </div>
        <div>
          {id ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">add</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
