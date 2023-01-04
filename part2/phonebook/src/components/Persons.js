import { React } from "react";

export function Persons({ persons, serachTerm }) {
    return (
        <>
            {persons
                .filter((person) => person.name.toLowerCase().includes(serachTerm.toLowerCase().trim()))
                .map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
        </>
    )
}