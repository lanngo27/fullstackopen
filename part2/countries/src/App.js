import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [hasFilter, setHasFilter] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = countries.filter(country => 
    country.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    if (event.target.value === "") setHasFilter(false)
    else setHasFilter(true)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      {hasFilter && filterCountries.length <= 10 && 
        <Countries countries={filterCountries} />
      }
      {hasFilter && filterCountries.length > 10 && 
        <div>Too many matches, specify another filter</div>
      }
    </div>
  )
}

export default App