console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})   



// Fetch and display weather data
async function fetchWeather() {
    // Retrieve the API key from environment variables (if using a bundler or Node.js environment)
    const apiKey = "d3f168d5513bd8145cf257eee7f1418c" ; // Adjust if needed to load .env variables
    const city = "Nairobi"; // Replace with your desired city name
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        // Fetch weather data from OpenWeather API
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        // Parse JSON data
        const data = await response.json();
        console.log(data); // Log data to verify connection

        // Call function to update UI with weather data
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Display the weather data in the weather component
function displayWeather(data) {
    // Extract relevant data from JSON response
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    console.log(iconUrl); 
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    // Update DOM elements
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDescription = document.getElementById('weather-description');

    // Set attributes and content for weather elements
    weatherIcon.src = iconUrl;
    weatherTemp.textContent = `${Math.round(temperature)}\u00B0`;
    weatherDescription.textContent = description;
}

// Call the fetchWeather function to initiate data retrieval and display
fetchWeather();
