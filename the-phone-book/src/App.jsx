import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [search, setSearch] = useState("");
  // console.log(search);

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    // const {name, value} = event.target;
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

  const personsWithSearch = persons.filter((person) => {
    let searchResult = "";
    if (search.length >= 1) {
      // searchResult = person.name.toLowerCase() === search.toLowerCase();
      searchResult = person.name.includes(search);
    } else {
      searchResult = persons;
    }

    return searchResult;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <span>filter shown with:</span>{" "}
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <br />
      <form onSubmit={handleFormSubmit}>
        <div>
          <span> name: </span>
          <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <span>number: </span>
          <input type="number" onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsWithSearch.map((person, index) => (
        <div key={index}>
          {person.name} - {person.number}
        </div>
      ))}

      {newName ? (
        <div>
          debug: {newName} - {newNumber}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default App;
