import React from "react";

const Form = ({ handleFormSubmit, handleChange, newName }) => {
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <span> name: </span>
          <input
            type="text"
            onChange={handleChange}
            value={newName.name}
            name="name"
          />
        </div>
        <div>
          <span>number: </span>
          <input
            type="number"
            onChange={handleChange}
            value={newName.number}
            name="number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
