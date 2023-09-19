import { React } from "react";
import axios from 'axios';

export function PersonForm({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) {

    function addNewPerson(event) {
        event.preventDefault();
        if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }

            const url = 'http://localhost:3001/persons'

            axios.post(url, newPerson)
                .then((response) => {
                    setPersons(persons.concat(response.data));
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