import { useState } from 'react'

const ShowList = ({ allPersons }) => {
  return (
    <div>
      {allPersons.map(person => {
        return <p key={person.name}>{person.name}</p>
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    if (persons.filter(checkPerson => checkPerson.name === newName).length === 0 ) {
      const personObject = {
        name: newName
      }

      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        
        <div> 
          name: 
          <input value={newName} onChange={handleNoteChange}/>   
        </div>

        <div> 
          <button type="submit"> add </button>
        </div>

      </form>
      <h2>Numbers</h2>
      
      <ShowList allPersons={persons}/>

    </div>
  )

}

export default App