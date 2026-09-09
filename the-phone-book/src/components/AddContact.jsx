import React, { useEffect, useState } from "react";
import axios from "axios";

import PhoneBook from "../services/node";

import Search from "./Search";
import Form from "./Form";
import Numbers from "./Numbers";

const AddContact = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  // editing contacts list
  const [id, setId] = useState(null);
  const [updated, setUpdated] = useState({});

  const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    PhoneBook.ListContact()
      .then((contacts) => setPersons(contacts))
      .catch((e) => {
        alert(`error while loading contatcs, ${e}`);
      });
  }, []);

  const handleChange = (event) => {
    // setNewName(event.target.value);
    const { name, value } = event.target;
    setNewName({ ...newName, [name]: value });
  };

  const handleEditButton = (id) => {
    const person = persons.find((person) => person.id == id);

    setId(id);
    setUpdated(person);
    // console.log(person);

    setNewName({ name: person.name, number: person.number });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let contact = {};
    // console.log(newName, " - ", newNumber);

    if (id != null) {
      //   console.log("old new name", updated);

      const updatedData = {
        ...updated,
        name: newName.name,
        number: newName.number,
      };

      //   console.log(updatedData, "new contact", id, "iddddd");

      PhoneBook.UpdateContact(id, updatedData).then((editedContact) =>
        setPersons(
          persons.map((updated) =>
            updated.id == id ? editedContact : updated,
          ),
        ),
      );
      setId(null);
      setUpdated({});
      setNewName({ name: "", number: "" });
    } else {
      const dataExist = persons.some((person) => {
        return person.name.toLowerCase() === newName.name.toLowerCase();
      });

      if (dataExist) {
        setNewName({ name: "", number: "" });
        return alert(`${newName.name} already added to phonebook`);
      } else {
        contact = {
          name: newName.name,
          number: newName.number,
        };
      }
      // console.log(contact);

      if (!dataExist) {
        PhoneBook.CreateContact(contact).then((newContact) => {
          return setPersons(persons.concat(newContact));
        });
        setNewName({ name: "", number: "" });
      }
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
        id={id}
      />

      <Numbers
        personsWithSearch={personsWithSearch}
        handleEditButton={handleEditButton}
      />

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
