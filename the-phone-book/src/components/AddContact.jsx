import React, { useEffect, useState } from "react";
import axios from "axios";

import Search from "./Search";
import Form from "./Form";
import Numbers from "./Numbers";

const AddContact = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  // const [newNumber, setNewNumber] = useState("");

  const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      const allPersons = response.data;
      setPersons(response.data);
    });
  }, []);

  const handleChange = (event) => {
    // setNewName(event.target.value);
    const { name, value } = event.target;
    setNewName({ ...newName, [name]: value });
  };

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

      <Search search={search} setSearch={setSearch} />
      <br />

      <Form
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        newName={newName}
      />

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
