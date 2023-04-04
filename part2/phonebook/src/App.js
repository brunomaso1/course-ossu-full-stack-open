import { useState, React, useEffect } from "react";
import axios from "axios";

import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [serachTerm, setSearchTerm] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response =>
      setPersons(response.data))
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
