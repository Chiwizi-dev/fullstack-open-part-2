import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [countries, setCountries] = useState(null);
  const [Acountry, setACountry] = useState(null);

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
    // console.log("chiwizi", e);
    // setACountry(null);
  };

  const countriesList = searchVal
    ? countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchVal.toLowerCase());
      })
    : [];

  useEffect(() => {
    if (countriesList.length === 0 || countriesList.length > 10) {
      setACountry(null);
    }
  }, [countriesList]);

  const showCountry = (code) => {
    // console.log(code, "Mrchiwizi");
    setACountry(countries.find((country) => country.ccn3 === code));
  };
  console.log("MrChiwizi", Acountry);

  console.log(countriesList.map((country) => country));
  // console.log(countriesList.map((country) => country.ccn3));

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
                  {/* <p>{country.ccn3}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <ul>
              {countriesList.map((country, index) => (
                <li key={index}>
                  {country.name.common}{" "}
                  <button
                    type="button"
                    onClick={() => showCountry(country.ccn3)}
                  >
                    show
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div></div>
        <div>
          {Acountry && (
            <div>
              <h1>{Acountry?.name?.common}</h1>
              <p>
                <span>Capital:</span> {Acountry?.capital}
              </p>
              <p>
                <span>Area:</span> {Acountry?.area}
              </p>
              <h2>Languages</h2>
              <ul>
                {Object.keys(Acountry?.languages || {}).map(
                  (language, index) => (
                    <li key={index}> {Acountry?.languages[language]}</li>
                  ),
                )}
              </ul>
              <img src={Acountry?.flags?.png} alt={Acountry?.name?.common} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
