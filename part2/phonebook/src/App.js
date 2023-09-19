import { useState, React, useEffect } from "react";
import personsService from "./services/persons";

import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [serachTerm, setSearchTerm] = useState('');

  const hook = () => {
    personsService.getAll().then(personsResponse =>
      setPersons(personsResponse))
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchTerm={setSearchTerm} serachTerm={serachTerm}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} serachTerm={serachTerm}></Persons>
    </div>
  );
}

export default App;
