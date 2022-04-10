import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  const countriesList = countries.map(country =>
    <Country country={country} key={country.name} />
  )

  return countries.length === 1 
    ? <Country country={countries[0]} />
    : countriesList
}

export default Countries