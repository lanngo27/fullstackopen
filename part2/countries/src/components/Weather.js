import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const [hasWeather, setHasWeather] = useState(false)
  const key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      .then(response => {
        setWeather(response.data)
        setHasWeather(true)
      })
  }, [])

  return (hasWeather && 
    <div>
        <h3>Weather in {city}:</h3>
        <div>Temperature: {Math.round(weather.main.temp - 273.15)} Celcius</div>
        <div>
          <img 
            alt={"Weather icon"} 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}>
          </img>
        </div>
        <div>Wind: {weather.wind.speed} m/s</div>
        <br/>
    </div>
  )
}

export default Weather