const Numbers = ({ personsWithSearch }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsWithSearch.map((person, index) => (
        <div key={index}>
          {person.name} - {person.number}
        </div>
      ))}
    </div>
  );
};

export default Numbers;
