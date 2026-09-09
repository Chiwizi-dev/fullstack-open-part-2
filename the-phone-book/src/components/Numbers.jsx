const Numbers = ({ personsWithSearch, handleEditButton }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsWithSearch.map((person) => (
        <div key={person.id}>
          {person.name} - {person.number}{" "}
          <button onClick={() => handleEditButton(person.id)}>edit</button>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
