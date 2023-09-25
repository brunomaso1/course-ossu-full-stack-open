/* eslint-disable react/prop-types */
export function CountryList({ countryList, handleShowButton }) {
    return (
        <>
            {
                countryList.map((country) =>
                    <p key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => {
                            handleShowButton(country.name.common)
                        }}>show</button>
                    </p>
                )
            }
        </>
    )
}