import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ valueToFind, onChange}) => {
  return (
    <form>
      <div>
        filter shown with
        <input value={valueToFind} onChange={onChange}/>
      </div>
    </form>
  )
}

const Persons = ({ allPersons, filteredByName }) => {
  if(filteredByName.length === 0) {
    return (
      <div>
        {allPersons.map(person => {
          return ( 
            <p key={person.name}> 
              {person.name} {person.number}
            </p>
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
        {allPersons.map(person => {
          if (person.name.toLowerCase().indexOf(filteredByName.toLowerCase()) != -1) {
            return (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            )
          }
        })}
      </div>
    )
  }
}

const PersonForm = ({ addNote, newName, newPhoneNumber, handleNameChange, handlePhoneChange }) => {
  return (
    <form onSubmit={addNote}>
      <div> 
        name: 
        <input value={newName} onChange={handleNameChange}/>   
      </div>

      <div>
        number: 
        <input value={newPhoneNumber} onChange={handlePhoneChange}/>
      </div>

      <div> 
        <button type="submit"> add </button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [findByName, setFindByName] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    if (persons.filter(checkPerson => checkPerson.name === newName).length === 0 ) {
      const personObject = {
        name: newName,
        number: newPhoneNumber
      }
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewPhoneNumber('')
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }
  const handleFindByNameChange = (event) => {
    setFindByName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter valueToFind={findByName} onChange={handleFindByNameChange}/>

      <h2>add a new</h2>

      <PersonForm addNote={addNote} newName={newName} newPhoneNumber={newPhoneNumber} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>

      <h2>Numbers</h2>
      
      <Persons allPersons={persons} filteredByName={findByName}/>

    </div>
  )

}

export default App