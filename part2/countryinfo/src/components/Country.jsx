import { Weather } from "./Weather";

/* eslint-disable react/prop-types */
export function Country({ country }) {
    if (!country)
        return null;

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <p><b>languages:</b></p>
            <ul>
                {
                    Object.values(country.languages).map((value) =>
                        <li key={value}>{value}</li>
                    )
                }
            </ul>
        <img src={country.flags.png} alt=''/>
        <Weather country={country}></Weather>
        </>
        // <pre>{JSON.stringify(country)}</pre>
    )
}