const apiKey = 'f3c42d1f3f0f83e66ad12b772831f987';

const darkModeToggle = document.getElementById('dark-mode-toggle');
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const locationDiv = document.getElementById('location');
const weatherIconDiv = document.getElementById('weather-icon');
const temperatureDiv = document.getElementById('temperature');
const descriptionDiv = document.getElementById('description');

let darkModeEnabled = false;

// toggle between light and dark mode
darkModeToggle.addEventListener('change', function() {
  const body = document.getElementsByTagName('body')[0];
  const container = document.getElementsByClassName('container')[0];
  if (this.checked) {
    body.style.backgroundColor = '#222';
    container.style.backgroundColor = '#333';
    container.style.color = '#fff';
    darkModeEnabled = true;
  } else {
    body.style.backgroundColor = '#f8f8f8';
    container.style.backgroundColor = '#fff';
    container.style.color = '#000';
    darkModeEnabled = false;
  }
});

// get weather data for the entered location
searchBtn.addEventListener('click', function() {
  const location = locationInput.value.trim();
  if (location === '') {
    alert('Please enter a location.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const weather = data.weather[0];
      const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
      locationDiv.textContent = data.name + ', ' + data.sys.country;
      weatherIconDiv.innerHTML = `<img src="${iconUrl}" alt="${weather.description}">`;
      temperatureDiv.textContent = Math.round(data.main.temp) + '°C';
      descriptionDiv.textContent = weather.description;
      if (darkModeEnabled) {
        locationDiv.style.color = '#fff';
        temperatureDiv.style.color = '#fff';
        descriptionDiv.style.color = '#fff';
      } else {
        locationDiv.style.color = '#000';
        temperatureDiv.style.color = '#000';
        descriptionDiv.style.color = '#000';
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while fetching the weather data. Please try again later.');
    });
});
