# Forecast-Frenzy

This is a web application that retrieves and displays the current weather and forecast for a given city using OpenWeatherMap API. The application stores the search history of the last 5 cities that were searched, so that users can quickly access the weather information for those cities again without typing in the city name again.

## API Key

To use this application, you need to have an API key for OpenWeatherMap API. The application uses the API key to fetch weather data from the OpenWeatherMap API. You can get a free API key by signing up on the [OpenWeatherMap website](https://home.openweathermap.org/users/sign_up).

Once you have an API key, replace the value of `API_KEY` in the `script.js` file with your own API key.

```javascript
const API_KEY = "your-api-key";
```

## Running the Application

To run the application, simply open the `index.html` file in your web browser.

## How to Use the Application

1.  Enter a city name in the search input field and click the "Search" button.
2.  The application will retrieve the current weather and forecast for the entered city and display it on the page.
3.  The search history will be updated with the searched city, and it will display the last 5 cities that were searched. You can click on any of the cities in the search history to retrieve the weather information for that city again.

## Technical Details

The application is built using HTML, CSS, and JavaScript. It uses the Fetch API to make HTTP requests to the OpenWeatherMap API and retrieve weather data. The application uses `localStorage` to store the search history so that it can be retrieved even after the page is refreshed or closed.

The `script.js` file contains the JavaScript code that handles form submission, retrieves weather data from the OpenWeatherMap API, updates the search history, and renders the weather information on the page.

## License

This project is licensed under the MIT License.

## Demonstration
