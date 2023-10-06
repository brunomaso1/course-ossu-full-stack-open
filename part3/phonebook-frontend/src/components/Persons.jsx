/* eslint-disable no-restricted-globals */
import personsService from "../services/persons";

const space = ` `;

export function Persons({ persons, setPersons, serachTerm, setErrorMessage }) {
    const handleEliminate = (personToDelete) => {
        if (confirm(`Delete ${personToDelete.name}?`)) {
            personsService.eliminate(personToDelete.id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== personToDelete.id))
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setPersons(persons.filter((person) => person.id !== personToDelete.id))
                        setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    } else {
                        alert(`Sorry, could not delete ${personToDelete.name}`)
                        console.log(error);
                    }
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