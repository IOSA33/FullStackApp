import { useState, useEffect } from 'react'
import apiService from './personsApi'
import "./index.css"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

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

const Persons = ({ allPersons, filteredByName, deleteOnClick }) => {
  if(filteredByName.length === 0) {
    return (
      <div>
        {allPersons.map(person => {
          return ( 
            <p key={person.id}> 
              {person.name} {person.number} <button onClick={() => deleteOnClick(person.id, person.name)}> delete </button>
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
              <p key={person.id}>
                {person.name} {person.number} <button onClick={() => deleteOnClick(person.id, person.name)}> delete </button>
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
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [findByName, setFindByName] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const addNote = (event) => {
    event.preventDefault()

    if (persons.filter(checkPerson => checkPerson.name === newName).length === 0 ) {
      const personObject = {
        name: newName,
        number: newPhoneNumber
      }

      apiService.create(personObject).then(response => {
        setPersons(persons.concat(response.data))
        setErrorMessage(`Added '${newName}'`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(()=> {
        console.log("Error in create!")
      })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName);
        
        const personObject = { 
          ...personToUpdate,
          number: newPhoneNumber
        }

        apiService.update(personToUpdate.id, personObject).then(returnedPerson => {
          setPersons(persons.map(n => n.name !== personToUpdate.name ? n : returnedPerson.data))
          setErrorMessage(`Phonenumber of '${personObject.name}' updated`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }).catch(()=>console.log("Error in map!"))
      } else {
        console.log("Pressed Cancel!")
      }
    }

    setNewName('')
    setNewPhoneNumber('')
  }

  const deleteNote = (id, name) => {
    if(window.confirm("Delete " + name + " ?")) {
      apiService.deleteId(id).then(() => {
        setPersons(persons.filter(n => n.id !== id))

        setErrorMessage(`Deleted '${name}' from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      }).catch(() => {
        console.log("No such id!")
      })

    } else {
      console.log("Pressed \"Cancel\" !")
    }
  }


  useEffect(() => {
    apiService.getAll().then(response => {
      setPersons(response.data)
    }).catch( ()=> {
      console.log("Error to getAll persons!")
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

      <Notification message={errorMessage}/>

      <Filter valueToFind={findByName} onChange={handleFindByNameChange}/>

      <h2>add a new</h2>

      <PersonForm addNote={addNote} newName={newName} newPhoneNumber={newPhoneNumber} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>

      <h2>Numbers</h2>
      
      <Persons allPersons={persons} filteredByName={findByName} deleteOnClick={deleteNote}/>

    </div>
  )

}

export default App