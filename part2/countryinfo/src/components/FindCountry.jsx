/* eslint-disable react/prop-types */
export function FindCountry({ setCountryName }) {
    function handleCountryName(event) {
        setCountryName(event.target.value)
    }

    return (
        <p>find countries <input type="text" id="countryName" aria-label="Country Name" onChange={handleCountryName}></input></p>
    )
}