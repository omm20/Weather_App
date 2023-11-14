document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '852d3e6db28b4354b11dd35f5abee7e1'; // Replace with your Weatherbit API key
    const searchBtn = document.getElementById('searchBtn');
    const inputBox = document.querySelector('.input-box');
    const locationNotFound = document.querySelector('.location-not-found');
    const weatherBody = document.querySelector('.weather-body');
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
  
    // Function to fetch weather data
    const fetchWeatherData = async (city) => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`
        );
  
        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }
  
        const data = await response.json();
  
        // Update HTML elements with weather data
        temperatureElement.textContent = `${data.data[0].temp}°C`;
        descriptionElement.textContent = data.data[0].weather.description;
        humidityElement.textContent = `${data.data[0].rh}%`;
        windSpeedElement.textContent = `${data.data[0].wind_spd} Km/H`;
  
        // Display the weather details
        locationNotFound.style.display = 'none';
        weatherBody.style.display = 'block';
      } catch (error) {
        // Handle errors, e.g., location not found
        locationNotFound.style.display = 'block';
        weatherBody.style.display = 'none';
        console.error('Error fetching weather data:', error);
      }
    };
  
    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
      const city = inputBox.value.trim();
      if (city !== '') {
        fetchWeatherData(city);
      }
    });
  });
  