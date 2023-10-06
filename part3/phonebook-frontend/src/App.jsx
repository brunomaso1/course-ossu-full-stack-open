import { useState, useEffect } from "react";

// Services
import personsService from "./services/persons";

// Components
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Notification } from "./components/Notification";
import { ErrorMessage } from "./components/ErrorMessage";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [serachTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personsService.getAll().then(personsResponse =>
      setPersons(personsResponse))
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <Filter setSearchTerm={setSearchTerm} serachTerm={serachTerm}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setNotification={setNotification}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons
        persons={persons} setPersons={setPersons}
        serachTerm={serachTerm}
        setErrorMessage={setErrorMessage}>
      </Persons>
    </div>
  );
}

export default App;
