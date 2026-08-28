import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("Enter contact's name");

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let contact = {};
    const dataExist = persons.some((person) => {
      return person.name.toLowerCase() === newName.toLowerCase();
    });

    dataExist
      ? alert(`${newName} already added to phonebook`)
      : (contact = {
          name: newName,
        });

    if (!dataExist) {
      setPersons(persons.concat(contact));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>{person.name}</div>
      ))}

      {/* <div>debug: {newName}</div> */}
    </div>
  );
};

export default App;
