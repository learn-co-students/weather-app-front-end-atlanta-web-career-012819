const BASE_URL = 'https://weather-app-rails.herokuapp.com'

document.addEventListener('DOMContentLoaded', function() {
  const locationForm = document.querySelector('form')
  locationForm.addEventListener('submit', handleForm)
})

function handleForm(e) {
  e.preventDefault()
  const location = e.target.elements["location"].value
  fetch(`${BASE_URL}/location/${location}`)
  .then(res => res.json())
  .then(data => parseLocation(data))
}

function parseLocation(data) {
  const coordinates = data["results"][0]["geometry"]["location"]
  const latitude = coordinates["lat"]
  const longitude = coordinates["lng"]
  fetch(`${BASE_URL}/weather?loc=${latitude}_${longitude}`)
  .then(res => res.json())
  .then(data => parseWeather(data))
}

function parseWeather(data) {
  const dailyForecast = data["hourly"]["summary"]
  displayWeather(dailyForecast)
}

function displayWeather(dailyForecast) {
  const weatherContainer = document.getElementById('weather-display')
  weatherContainer.innerHTML = ''
  const forecastElement = document.createElement('p')
  forecastElement.textContent = "Today's forecast: " + dailyForecast
  weatherContainer.appendChild(forecastElement)
}
