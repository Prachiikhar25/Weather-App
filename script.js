const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    if (!city.trim()) {
        alert('Please enter a location');
        return;
    }

    const api_key = "5edd8201a4e45e39286ce082969591c0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        // Hide error message and show weather info
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Calculate temperature in Celsius
        const temp = Math.round(weather_data.main.temp - 273.15);
        temperature.innerHTML = `${temp}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        // Update weather image
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "cloud.png";
                break;
            case 'Clear':
                weather_img.src = "clear.png";
                break;
            case 'Rain':
                weather_img.src = "rain.png";
                break;
            case 'Mist':
                weather_img.src = "mist.png";
                break;
            case 'Snow':
                weather_img.src = "snow.png";
                break;
            default:
                weather_img.src = "cloud.png";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Add event listeners
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});