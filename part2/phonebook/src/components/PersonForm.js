import { React } from "react";

export function PersonForm({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) {

    function addNewPerson(event) {
        event.preventDefault();
        if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons(persons.concat({
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }));
            setNewNumber('');
            setNewName('');
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