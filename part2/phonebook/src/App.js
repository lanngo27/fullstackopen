import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [hasFilter, setHasFilter] = useState(false)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => 
        setPersons(initialPersons)
      )
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook. `
        + `Replace old number with a new one?`)) {
        const changedPerson = {...existingPerson, number: newNumber}
        phonebookService
          .update(changedPerson.id, changedPerson)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.name != newName 
              ? person
              : returnedPersons
            ))
            setNotification({
              message: `Replaced number of ${newName}`, 
              type: 'message'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Information of ${newName} has already been removed from server`, 
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })
      }
    } else {
      phonebookService
        .create({name: newName, number: newNumber})
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
          setNotification({
            message: `Added ${newName}`, 
            type: "message"
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleFilterChange = (event) => {  
    setNewFilter(event.target.value)    
    if (event.target.value !== '')
      setHasFilter(true)
    else 
      setHasFilter(false)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`))
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({
            message: `Deleted information of ${name}`, 
            type: "message"
          })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          }
        )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {notification != null
        ? <Notification message={notification.message} messageType={notification.type} />
        : <Notification message={null}/>
      }

      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} 
        onChangeName={handleNameChange} onChangeNumber={handleNumberChange} 
      />

      <h3>Numbers</h3>
      {!hasFilter && <Persons persons={persons} handleDelete={handleDelete} />}
      {hasFilter && <Persons persons={persons.filter(
        person => person.name.toLowerCase().includes(newFilter.toLowerCase())
        )} handleDelete={handleDelete}
      />}

    </div>
  )
}

export default App