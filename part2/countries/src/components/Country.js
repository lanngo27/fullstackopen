import React from 'react'
import { useState } from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  const [showAll, setShowAll] = useState(false)

  const handleClick = (event) => {
    setShowAll(true)
  }

  return showAll 
  ? (<div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    
    <div>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map(language => 
            <li key={language.name}>
                {language.name}
            </li>
        )}
      </ul>
    </div>

    <div>
      <img alt={"Country flag"} width={"200px"} src={country.flag}>
      </img>
    </div>  
    <Weather city={country.capital} />    
  </div>)
  : (<div key={country.name}>
    {country.name}{" "}
    <button onClick={handleClick} id={country.name}>
    show
    </button>
  </div>)
}

export default Country