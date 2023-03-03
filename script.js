// API key for OpenWeatherMap API
const API_KEY = "05ac1fcbd60b3f517586e36551ef7ff9";

// Variables to store references to HTML elements
const searchFormEl = document.querySelector("#search-form");
const searchInputEl = document.querySelector("#search-input");
const searchHistoryEl = document.querySelector("#search-history");
const currentWeatherEl = document.querySelector("#current-weather");
const forecastEl = document.querySelector("#forecast");

// Array to store search history
let searchHistory = [];

// Function to handle form submit event
function handleSearchFormSubmit(event) {
  console.log("test only");
  event.preventDefault();

  // Get search input value
  const searchTerm = searchInputEl.value.trim();
  console.log(searchTerm);

  // Call function to get weather data for the search term
  getWeatherData(searchTerm);

  // Clear the search input
  searchInputEl.value = "";
}

async function getWeatherData(city) {
  // Build URL for current weather data
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;

  // Call API to get current weather data
  const currentWeatherResponse = await fetch(currentWeatherUrl);
  const currentWeatherData = await currentWeatherResponse.json();

  // Get latitude and longitude from current weather data
  const lat = currentWeatherData.coord.lat;
  const lon = currentWeatherData.coord.lon;

  // Build URL for forecast data
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  console.log(forecastUrl);

  // Call API to get forecast data
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  // Add city to search history
  addCityToSearchHistory(city);

  // Render current weather and forecast data
  renderCurrentWeather(currentWeatherData);
  renderForecast(forecastData);
}

// // Function to add city to search history
// function addCityToSearchHistory(city) {
//   // If city already exists in search history, remove it
//   const index = searchHistory.indexOf(city);
//   if (index > -1) {
//     searchHistory.splice(index, 1);
//   }

//   // Add city to beginning of search history array
//   searchHistory.unshift(city);

//   // If search history has more than 5 items, remove the oldest item
//   if (searchHistory.length > 5) {
//     searchHistory.pop();
//   }

//   // Render search history
//   renderSearchHistory();
// }

// Function to add city to search history and store in local storage
function addCityToSearchHistory(city) {
  // Get the search history from local storage
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Check if the city already exists in the search history
  const index = searchHistory.indexOf(city);

  if (index > -1) {
    // Remove only the duplicate item from the search history
    searchHistory.splice(index, 1);

    // Update the search history in local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  // Add city to beginning of search history array
  searchHistory.unshift(city);

  // If search history has more than 5 items, remove the oldest item
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }

  // Store search history in local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  // Render search history
  renderSearchHistory();
}

// Function to render search history from local storage
function renderSearchHistory() {
  // Clear existing search history
  searchHistoryEl.innerHTML = "";

  // Retrieve search history from local storage
  const searchHistoryFromStorage =
    JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Render the last 5 searches from search history
  searchHistoryFromStorage.slice(0, 5).forEach((city) => {
    const buttonEl = document.createElement("button");
    buttonEl.textContent = city;
    buttonEl.classList.add(
      "btn",
      "btn-secondary",
      "mb-2",
      "btn-lg",
      "btn-block",
      "w-100"
    );

    // Add event listener to button
    buttonEl.addEventListener("click", () => {
      getWeatherData(city);
    });

    searchHistoryEl.appendChild(buttonEl);
  });
}

// Function to render current weather data
function renderCurrentWeather(data) {
  // Get required data from API response
  const cityName = data.name;
  const date = new Date(data.dt * 1000);
  const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const temperature = Math.round(data.main.temp);
  console.log("current temp: ", temperature);
  console.log("current data", data);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed);
  console.log(temperature);

  // Create HTML elements to display data
  const cityNameEl = document.createElement("h2");
  cityNameEl.textContent = cityName;

  const dateEl = document.createElement("p");
  const temperatureEl = document.createElement("p");
  const humidityEl = document.createElement("p");
  const windSpeedEl = document.createElement("p");
  const iconEl = document.createElement("img"); // Define iconEl variable

  // Set text content of HTML elements
  cityNameEl.textContent = cityName;
  dateEl.textContent = `(${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()})`;
  temperatureEl.textContent = `Temperature: ${temperature} °F`;
  humidityEl.textContent = `Humidity: ${humidity}%`;
  windSpeedEl.textContent = `Wind Speed: ${windSpeed} MPH`;
  iconEl.src = icon; // Set src attribute of iconEl

  // Add HTML elements to current weather element
  currentWeatherEl.innerHTML = "";
  currentWeatherEl.classList.remove("hide");
  currentWeatherEl.appendChild(cityNameEl);
  currentWeatherEl.appendChild(dateEl);
  currentWeatherEl.appendChild(iconEl);
  currentWeatherEl.appendChild(temperatureEl);
  currentWeatherEl.appendChild(humidityEl);
  currentWeatherEl.appendChild(windSpeedEl);
}

// Function to render forecast data
function renderForecast(data) {
  // Get list of forecast items from API response
  const forecastItems = data.list;

  // Clear existing forecast data
  forecastEl.innerHTML = "";

  // Loop through each forecast item and render it
  forecastItems.forEach((item, index) => {
    // Only render forecast items at 12:00pm
    if (item.dt_txt.indexOf("12:00:00") !== -1) {
      // Get required data from API response
      const date = new Date(item.dt * 1000);
      const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
      const temperature = Math.round(item.main.temp);
      const humidity = item.main.humidity;
      const windSpeed = Math.round(item.wind.speed);
      console.log(item);
      // Create HTML elements to display data
      const cardEl = document.createElement("div");
      const cardBodyEl = document.createElement("div");
      const dateEl = document.createElement("h5");
      const iconEl = document.createElement("img");
      const temperatureEl = document.createElement("p");
      const humidityEl = document.createElement("p");
      const windSpeedEl = document.createElement("p");

      // Set classes for HTML elements
      cardEl.classList.add("card", "bg-primary", "text-light", "m-2");
      cardBodyEl.classList.add("card-body");
      dateEl.classList.add("card-title");
      iconEl.classList.add("icon-img");
      temperatureEl.classList.add("card-text");
      humidityEl.classList.add("card-text");
      windSpeedEl.classList.add("card-text");

      // Set text content of HTML elements
      dateEl.textContent = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      iconEl.setAttribute("src", icon);
      iconEl.setAttribute("alt", item.weather[0].description);
      temperatureEl.textContent = `Temp: ${temperature} °F`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      windSpeedEl.textContent = `Wind: ${windSpeed} MPH`;

      // Add HTML elements to forecast element
      forecastEl.appendChild(cardEl);
      cardEl.appendChild(cardBodyEl);
      cardBodyEl.appendChild(dateEl);
      cardBodyEl.appendChild(iconEl);
      cardBodyEl.appendChild(temperatureEl);
      cardBodyEl.appendChild(humidityEl);
      cardBodyEl.appendChild(windSpeedEl);
    }
  });
}

// Add event listener to search form
searchFormEl.addEventListener("click", handleSearchFormSubmit);
renderSearchHistory();
