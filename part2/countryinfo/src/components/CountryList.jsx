/* eslint-disable react/prop-types */
export function CountryList({ countryList }) {
    return (
        <>
            {
                countryList.map((country) =>
                    <p key={country.name.common}>{country.name.common}</p>
                )
            }
        </>
    )
}