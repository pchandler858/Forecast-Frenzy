function renderForecast(data) {
    // Clear existing forecast
    forecastEl.innerHTML = "";
  
    // Create HTML elements to display forecast data
    const headingEl = document.createElement("h2");
    headingEl.textContent = "5-Day Forecast:";
    forecastEl.appendChild(headingEl);
  
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    forecastEl.appendChild(rowEl);
  
    // Loop through forecast data for each day
    for (let i = 0; i < data.list.length; i += 8) {
      const dayData = data.list[i];
  
      // Get required data from API response
      const date = new Date(dayData.dt * 1000);
      const icon = `https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;
      const highTemp = Math.round(dayData.main.temp_max);
      const lowTemp = Math.round(dayData.main.temp_min);
  
      // Create HTML elements to display data
      const colEl = document.createElement("div");
      colEl.classList.add("col-md-2");
  
      const cardEl = document.createElement("div");
      cardEl.classList.add("card", "bg-primary", "text-white");
  
      const cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body", "p-2");
  
      const dateEl = document.createElement("p");
      dateEl.classList.add("card-text");
      dateEl.textContent = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
  
      const iconEl = document.createElement("img");
      iconEl.setAttribute("src", icon);
  
      const highTempEl = document.createElement("p");
      highTempEl.classList.add("card-text");
      highTempEl.textContent = `High: ${highTemp} °F`;
  
      const lowTempEl = document.createElement("p");
      lowTempEl.classList.add("card-text");
      lowTempEl.textContent = `Low: ${lowTemp} °F`;
  
      // Add HTML elements to forecast element
      cardBodyEl.appendChild(dateEl);
      cardBodyEl.appendChild(iconEl);
      cardBodyEl.appendChild(highTempEl);
      cardBodyEl.appendChild(lowTempEl);
      cardEl.appendChild(cardBodyEl);
      colEl.appendChild(cardEl);
      rowEl.appendChild(colEl);
    }
  }