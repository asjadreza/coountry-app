import React, { useState, useEffect } from 'react';
import BorderCountries from './BorderCountries';
import '../index.css'

const CountryDetails = () => {

  // styles
  const imgStyles = {
    width: '100%',
    height: '382px'
  }

  const detailsStyles = {
    marginLeft: '50px',
    lineHeight: '1.2',
    marginTop: '60px'
  }
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryName = new URLSearchParams(window.location.search).get('name');
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const [country] = await response.json();
        // console.log(country)

        setCountryData(country);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container-md border border-info mt-4'>
      {loading && <div>Loading...</div>}
      {!loading && countryData && (
        <div>
          <div className='row' style={{padding: '43px'}}>
            <div className="col-lg-6">
              <h1>{countryData.name.common}</h1>
              <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} style={imgStyles} />
            </div>
            <div className='col-lg-4 details-section' style={detailsStyles}>
              <p>Native Name: {countryData.name.common}</p>
              <p>Population: {countryData.population}</p>
              {countryData.capital && (
                <p>Capital: {countryData.capital[0]}</p>
              )}
              <p>Region: {countryData.region}</p>
              {countryData.subregion && (
                <p>Sub-region: {countryData.subregion} </p>
              )}
              {countryData.area && (
                <p>Area: {countryData.area} Km²</p>
              )}
              {countryData.idd && (
                <p>Country Code: {countryData.idd.root + countryData.idd.suffixes}</p>
              )}
              {countryData.languages && (
                <p>Languages: {Object.values(countryData.languages).join(', ')}</p>
              )}
              {countryData.currencies && (
                <p>Currencies: {Object.values(countryData.currencies).map((currency) => currency.name).join(', ')}</p>
              )}
              {countryData.timezones && (
                <p>Timezones: {countryData.timezones}</p>
              )}
            </div>
          </div>
              <BorderCountries borders={countryData.borders} />
        </div>
      )}
      {!loading && !countryData && <div>No data available for this country.</div>}
    </div>

  );
};

export default CountryDetails;
