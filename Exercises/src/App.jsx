import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);

  // console.log(searchVal);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all/")
      .then((response) => setCountries(response.data));
  }, []);
  // const returned = countries.map((country) => {
  //   console.log(country.name.common);
  // });

  const handleSearchCountries = (e) => {
    setSearchVal(e.target.value);
    // console.log(searchVal);
  };

  const countriesList = searchVal
    ? countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchVal.toLowerCase());
      })
    : [];

  console.log(countriesList.map((country) => country));
  // console.log(countriesList.map((country) => country.name.common));

  return (
    <div>
      <div>
        <span>find countries: </span>
        <input
          type="text"
          value={searchVal}
          onChange={handleSearchCountries}
          placeholder="find countries"
        />
        <div>
          {countriesList.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : countriesList.length === 1 ? (
            <div>
              {" "}
              {countriesList.map((country, index) => (
                // <p key={index}>{country.name.common}</p>
                <div key={index}>
                  <h1>{country.name.common}</h1>
                  <p>
                    <span>Capital:</span> {country.capital}
                  </p>
                  <p>
                    <span>Area:</span> {country.area}
                  </p>
                  <h2>Languages</h2>
                  <ul>
                    {Object.keys(country.languages).map((language, index) => (
                      <li key={index}> {country.languages[language]}</li>
                    ))}
                  </ul>
                  <img src={country.flags.png} alt="" />
                </div>
              ))}
            </div>
          ) : (
            <ul>
              {countriesList.map((country, index) => (
                <li key={index}>{country.name.common}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
