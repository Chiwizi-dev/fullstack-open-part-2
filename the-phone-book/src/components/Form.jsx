import React from "react";

const Form = ({ handleFormSubmit, handleChange, newName, id }) => {
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
            type="text"
            onChange={handleChange}
            value={newName.number}
            name="number"
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
