const Numbers = ({
  personsWithSearch,
  handleEditButton,
  handleDeleteButton,
}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsWithSearch.map((person) => (
        <div key={person.id}>
          {person.name} - {person.number}{" "}
          <button onClick={() => handleEditButton(person.id)}>Edit</button> |{" "}
          <button onClick={() => handleDeleteButton(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
