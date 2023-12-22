// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';
import Header from './Header';

const Countries = () => {
  // const history = useHistory();
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
        setAllCountriesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    } else {
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  };

  const calculateLocalDateTime = (country) => {
    if (!country.timezones || country.timezones.length === 0) {
      return "No timezone info";
    }

    const currentUtcTime = new Date();
    const localDateTime = new Date(currentUtcTime);

    let standardUtcOffset = 0;
    for (const timezone of country.timezones) {
      const match = timezone.match(/([+-]?\d+)(?::(\d+))?/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        standardUtcOffset = ((hours - 5) * 60 + (minutes - 30)) * 60 * 1000;
        break;
      }
    }

    localDateTime.setTime(currentUtcTime.getTime() + standardUtcOffset);

    const optionsDate = { month: "short", year: "numeric" };
    const localDateString = localDateTime.toLocaleDateString(
      undefined,
      optionsDate
    );
    const dayWithSuffix = addOrdinalSuffix(localDateTime.getDate());
    let hours = localDateTime.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const optionsTime = { hour: "numeric", minute: "numeric" };
    const localTimeString = localDateTime.toLocaleTimeString(
      undefined,
      optionsTime
    );

    return `${dayWithSuffix} ${localDateString}, ${localTimeString} ${amPm}`;
  };

  const showMap = (mapUrl) => {
    window.open(mapUrl, '_blank');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const showCountries = () => {
    if (!allCountriesData) {
      return null;
    }

    // Filter countries based on the search query
    const filteredCountries = allCountriesData.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className='container-md'>
        
        {filteredCountries.map((country, index) => (
          <div className='card' style={{ margin: '10px' }} key={index}>
            <div className='row'>
              <div className='col-lg-4 align-self-center'>
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  style={{ width: '50%', height: '50%', marginRight: '5px' }}
                />
              </div>
              <div className='card-text col-lg-8 align-self-center'>
                <h2>{country.name.common}</h2>
                <p>Currency: {country.currencies ? Object.values(country.currencies).map((currency) => currency.name).join(', ') : 'N/A'}</p>
                <p>Current date and time: {calculateLocalDateTime(country)}</p>
                <div className='row justify-content-around buts'>
                  <button type='button' className='btn btn-outline-primary col-5'
                    onClick={() => showMap(country.maps.googleMaps)}>
                    Show Map
                  </button>
                  <Link
                    to={`/CountryDetails?name=${country.name.common}`}
                    className='btn btn-outline-primary col-5'
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Searchbar onSearchChange={handleSearchChange} />
      {showCountries()}
    </div>
  );
};

export default Countries;


