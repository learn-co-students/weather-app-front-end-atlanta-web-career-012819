const BASE_URL = 'https://weather-app-rails.herokuapp.com'
let formatted_address;

document.addEventListener("DOMContentLoaded", () => {
  console.warn("DOM Content Loaded");

  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit)
})

function handleFormSubmit(e) {
  e.preventDefault();

  const location = e.target.elements["location"]
  getLocation(location.value)
  // .then(console.log)
  .then(getWeather)
  .then(renderData)
}

function getLocation(location) {
  // console.log(location)
  return fetch(`${BASE_URL}/location/${location}`)
  .then(response => response.json())
}

function getWeather(data) {
  // console.log(data.results[0].geometry.location)
  // console.log(data.results[0].formatted_address)
  formatted_address = data.results[0].formatted_address;
  const location = data.results[0].geometry.location
  const latitude = location.lat;
  const longitude = location.lng;
  // console.log("Latitude: ", latitude);
  // console.log("Longitude: ", longitude);

  return fetch(`${BASE_URL}/weather?loc=${latitude}_${longitude}`)
  .then(response => response.json())
}

function renderData(data) {
  console.log(data)
  const display = document.getElementById('weather-display')
  display.innerHTML = '';

  const hline = document.createElement('div')
  hline.className = "hline"
  display.appendChild(hline)

  const header = document.createElement('h1');
  header.innerText = `Weather in ${formatted_address}`
  display.appendChild(header)

  const current = document.createElement('h3')
  current.innerText = `Currently: ${data.currently.summary}`
  display.appendChild(current)

  const summary = document.createElement('h3')
  summary.innerText = `Today: ${data.hourly.summary}`
  display.appendChild(summary);

  const weekly = document.createElement('h3')
  weekly.innerText = `Next Week: ${data.daily.summary}`
  display.appendChild(weekly);

  const weeklyList = document.createElement('ul')
  display.appendChild(weeklyList);

  data.daily.data.forEach(weeklyData => {
    console.log(weeklyData)
    const item = document.createElement('li');
    item.innerText = weeklyData.summary
    weeklyList.appendChild(item)
  })
}
