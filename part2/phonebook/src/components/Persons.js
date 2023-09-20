/* eslint-disable no-restricted-globals */
import { React } from "react";
import personsService from "../services/persons";

const space = ` ` ;

export function Persons({ persons, setPersons, serachTerm }) {
    const handleEliminate = (personToDelete) => {
        if (confirm(`Delete ${personToDelete.name}?`)) {
            personsService.eliminate(personToDelete.id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== personToDelete.id))
                })
                .catch((response) => {
                    alert(`Sorry, could not delete ${personToDelete.name}`)
                    console.log(response);
                })
        }
    }

    return (
        <>
            {persons
                .filter((person) => person.name.toLowerCase().includes(serachTerm.toLowerCase().trim()))
                .map((person) => <p key={person.id}>
                    {person.name} {person.number} {space}
                    <button onClick={() => handleEliminate(person)}>delete</button>
                </p>)}
        </>
    )
}