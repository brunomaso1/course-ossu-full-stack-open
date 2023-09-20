/* eslint-disable no-restricted-globals */
import { React } from "react";
import personsService from "../services/persons";

export function PersonForm({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) {

    function addNewPerson(event) {
        event.preventDefault();
        const updatePerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
        if (updatePerson !== undefined) {
            if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService.update({ ...updatePerson, number: newNumber })
                    .then(() => {
                        setPersons(persons.map(person =>
                            person.id === updatePerson.id ? { ...updatePerson, number: newNumber } : { ...person }
                        ))
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            personsService.create(newPerson)
                .then((personResponse) => {
                    setPersons(persons.concat(personResponse));
                })
                .catch((response) => {
                    alert(`Person ${newPerson.name} can not be saved`)
                    console.log(response);
                })
                .finally(() => {
                    setNewNumber('');
                    setNewName('');
                })
        }
    }

    function handleNewNameChange(event) {
        setNewName(event.target.value);
    }

    function handleNewNumberChange(event) {
        setNewNumber(event.target.value);
    }

    return (
        <form onSubmit={addNewPerson} >
            <div>name: <input onChange={handleNewNameChange} value={newName} /></div>
            <div>number: <input onChange={handleNewNumberChange} value={newNumber} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}