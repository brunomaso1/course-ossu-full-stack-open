import { useEffect, useState } from 'react'

import countryService from './services/countryService';
import { CountryList } from './components/CountryList';
import { FindCountry } from './components/FindCountry';
import { Country } from './components/Country';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [showInfMessage, setShowInfMessage] = useState(false);
  const [country, setCountry] = useState(null)

  useEffect(() => {
    setCountry(null)
    setCountryList([])
    setShowInfMessage(false)
    if (countryName) {
      const controller = new AbortController();
      countryService.getAll({ signal: controller.signal })
        .then((countries) => {
          const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(countryName.toLowerCase().trim()));
          if (filteredCountries.length > 10) {
            setShowInfMessage(true)
          } else if (filteredCountries.length !== 1) {
            setCountryList(filteredCountries)
          } else {
            setCountry(filteredCountries.pop())
          }
        })
        .catch(response => {
          console.log("Request cancelled: " + response.code);
        })

      return () => {
        controller?.abort();
      }
    }
  }, [countryName])

  return (
    <>
      <FindCountry setCountryName={setCountryName}></FindCountry>
      {showInfMessage ? <p>Too many matches, specify another filter</p> : null}
      <CountryList countryList={countryList}></CountryList>
      <Country country={country}></Country>
    </>
  )
}

export default App