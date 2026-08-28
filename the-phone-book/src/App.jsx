import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    // const [name, value] = event.target;
    setNewNumber(event.target.value);
    // console.log(newNumber);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let contact = {};
    // console.log(newName, " - ", newNumber);

    const dataExist = persons.some((person) => {
      return person.name.toLowerCase() === newName.toLowerCase();
    });

    // dataExist
    //   ? alert(`${newName} already added to phonebook`)
    //   : (contact = {
    //       name: newName,
    //     });

    if (dataExist) {
      return alert(`${newName} already added to phonebook`);
    } else {
      contact = {
        name: newName,
        number: newNumber,
      };
    }

    if (!dataExist) {
      setPersons(persons.concat(contact));
      setNewName("");
      setNewNumber("");
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
          number:{" "}
          <input type="number" onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} - {person.number}
        </div>
      ))}

      <div>
        debug: {newName} - {newNumber}
      </div>
    </div>
  );
};

export default App;
