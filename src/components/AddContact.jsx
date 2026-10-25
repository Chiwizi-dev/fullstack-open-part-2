import React, { useEffect, useState } from "react";
import axios from "axios";

import PhoneBook from "../services/node";

import Search from "./Search";
import Form from "./Form";
import Numbers from "./Numbers";
import Notifications from "./Notifications";

const AddContact = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  // editing contacts list
  const [id, setId] = useState(null);
  const [updated, setUpdated] = useState(null);

  //   updating a contact
  const [updatedContact, setUpdatedContact] = useState(null);

  const [search, setSearch] = useState("");
  // console.log(search);

  const [messages, setMessages] = useState(null);

  useEffect(() => {
    PhoneBook.ListContact()
      .then((contacts) => setPersons(contacts))
      .catch((e) => {
        // alert(`error while loading contatcs, ${e}`);
        setMessages("Server is busy, please try again later");
        setTimeout(() => {
          setMessages(null);
        }, 5000);
      });
  }, []);

  // Edit
  const handleChange = (event) => {
    // setNewName(event.target.value);
    const { name, value } = event.target;
    setNewName({ ...newName, [name]: value });
  };

  const handleEditButton = (id) => {
    const person = persons.find((person) => person.id == id);

    setId(person.id);
    setUpdated(person);
    // console.log(person);

    setNewName({ name: person.name, number: person.number });
  };

  const handleDeleteButton = (id) => {
    const findPerson = persons.find((person) => person.id == id);
    // console.log(findPerson, "find person");

    if (findPerson && window.confirm(`Delete ${findPerson.name}`)) {
      PhoneBook.DeleteContact(findPerson.id).catch((error) => {
        setMessages(
          `information of ${findPerson.name} has already been removed from server`,
        );
        setTimeout(() => {
          setMessages(null);
        }, 5000);
      });
      setPersons(persons.filter((person) => person.id !== findPerson.id));
      // .catch((error) => ("Error occured during deletion", error),
      // );
    }
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

      // EDIT
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

      setMessages(`Edited ${updated.name} `);
      setTimeout(() => {
        setMessages(null);
      }, 5000);
    } else {
      const dataExist = persons.some((person) => {
        return person.name.toLowerCase() === newName.name.toLowerCase();
      });

      const matchedPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.name.toLowerCase(),
      );

      if (
        dataExist &&
        window.confirm(
          `${newName.name} is already added to PhoneBook, replace the old number with a new one?`,
        )
      ) {
        const updatedData = {
          ...matchedPerson,
          number: newName.number,
        };

        // EDIT CONTACTS
        PhoneBook.UpdateContact(matchedPerson.id, updatedData)
          .then((contact) => {
            //   (returnedData) => console.log(returnedData.id, returnedData),

            (setPersons(
              persons.map((person) =>
                person.id == contact.id ? contact : person,
              ),
            ),
              setMessages(`Updated ${contact.name} `));
            setTimeout(() => {
              setMessages(null);
            }, 5000);
          })
          .catch((error) => {
            setMessages(`Failed to update User. Please try again later}`);
          });

        setNewName({ name: "", number: "" });

        // console.log(
        //   "matchedPerson",
        //   matchedPerson.id,
        //   matchedPerson.name,
        //   matchedPerson.number,
        //   newName.number,
        //   "dataExist",
        //   dataExist,
        // );

        // return alert(`${newName.name} already added to phonebook`);
      } else {
        contact = {
          name: newName.name,
          number: newName.number,
        };
      }
      // console.log(contact);

      // ADD CONTACT
      if (!dataExist) {
        PhoneBook.CreateContact(contact)
          .then((newContact) => {
            setPersons(persons.concat(newContact));
            setMessages(`Added ${newContact.name} `);
            setTimeout(() => {
              setMessages(null);
            }, 5000);
            // console.log(messages, " : Messages");
          })
          .catch((e) => {
            setMessages(
              `Failed to create ${contact.name}. Please try again later`,
            );
            setTimeout(() => {
              setMessages(null);
            }, 5000);
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
      <h1>Phonebook</h1>

      <Notifications messages={messages} />

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
        handleDeleteButton={handleDeleteButton}
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
