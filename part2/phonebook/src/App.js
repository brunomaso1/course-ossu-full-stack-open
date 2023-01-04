import { useState, React } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [serachTerm, setSearchTerm] = useState('');

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
