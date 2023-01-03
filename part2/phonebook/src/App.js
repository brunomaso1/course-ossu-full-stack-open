import { useState, React } from "react";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');

  function addNewPerson(event) {
    event.preventDefault();
    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName('');
    }
  }

  function handleNewNameChange(event) {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson} >
        <div>name: <input onChange={handleNewNameChange} value={newName} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name}</p>
      })}
    </div>
  );
}

export default App;
