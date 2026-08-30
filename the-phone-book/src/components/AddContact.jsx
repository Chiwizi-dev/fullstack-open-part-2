import React, { useState } from "react";
import Search from "./Search";
import Form from "./Form";
import Numbers from "./Numbers";

const AddContact = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  ]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  // const [newNumber, setNewNumber] = useState("");

  const [search, setSearch] = useState("");
  // console.log(search);

  const handleChange = (event) => {
    // setNewName(event.target.value);
    const { name, value } = event.target;
    setNewName({ ...newName, [name]: value });
  };

  // const handleNumber = (event) => {
  //   // const {name, value} = event.target;
  //   setNewNumber(event.target.value);
  //   // console.log(newNumber);
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let contact = {};
    // console.log(newName, " - ", newNumber);

    const dataExist = persons.some((person) => {
      return person.name.toLowerCase() === newName.name.toLowerCase();
    });

    if (dataExist) {
      return alert(`${newName.name} already added to phonebook`);
    } else {
      contact = {
        name: newName.name,
        number: newName.number,
      };
    }

    if (!dataExist) {
      setPersons(persons.concat(contact));
      setNewName({ name: "", number: "" });
    }
  };

  const personsWithSearch = persons.filter((person) => {
    let searchResult = "";
    if (search.length >= 1) {
      // searchResult = person.name.toLowerCase() === search.toLowerCase();
      searchResult = person.name.toLowerCase().includes(search.toLowerCase());
    } else {
      searchResult = persons;
    }

    return searchResult;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>
        <span>filter shown with:</span>{" "}
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div> */}
      <Search search={search} setSearch={setSearch} />
      <br />
      {/* <form onSubmit={handleFormSubmit}>
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
      </form> */}
      <Form
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        newName={newName}
      />

      {/* <h2>Numbers</h2>
      {personsWithSearch.map((person, index) => (
        <div key={index}>
          {person.name} - {person.number}
        </div>
      ))} */}

      <Numbers personsWithSearch={personsWithSearch} />

      {newName.name ? (
        <div>
          debug: {newName.name} - {newName.number}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AddContact;
