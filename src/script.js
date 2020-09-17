//Date and Hour functions
let todayDate = new Date();

function currentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentYear = todayDate.getFullYear();
  let currentDay = days[todayDate.getDay()];
  let currentMonth = months[todayDate.getMonth()];
  let currentDate = todayDate.getDate();
  let currentHour = todayDate.getHours();

  let sidebar = document.querySelector("#sideBar");

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = todayDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  if (currentHour >= 5 && currentHour <= 11) {
    greetingUser = "Good Morning";
    sidebar.style.background =
      "linear-gradient(to top, #a3bded 0%, #6991c7 100%)"; //blue sky
  }
  if (currentHour >= 12 && currentHour <= 16) {
    greetingUser = "Good Afternoon";
    sidebar.style.background =
      "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%) "; //purple
  }
  if (currentHour >= 17 && currentHour <= 23) {
    greetingUser = "Good Evening";
    sidebar.style.background =
      "linear-gradient(to right, #868f96 0%, #596164 100%) "; //grey
  }
  if (currentHour >= 0 && currentHour <= 4) {
    greetingUser = "Good Evening";
    sidebar.style.background =
      "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"; //strong blue
  }

  let welcomeGreeting = document.querySelector("#greeting");
  welcomeGreeting.innerHTML = `${greetingUser}`;

  let sentenceDate = `${currentDay}        ${currentDate} ${currentMonth} ${currentYear}`;
  let sentenceHour = `${currentHour}:${currentMinute}`;

  let date = document.querySelector("#currentDay");
  date.innerHTML = sentenceDate;

  let hour = document.querySelector("#currentTime");
  hour.innerHTML = sentenceHour;

  return `${currentHour}:${currentMinute}`;
}

currentDate(todayDate);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//SEARCH CITY WEATHER

function displayWeather(response) {
  let nameCity = response.data.name;
  let location = document.querySelector("#currentCity");
  location.innerHTML = nameCity;

  let tempC = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = `${tempC}`;

  celsiusTemperature = response.data.main.temp;

  let tempMax = Math.round(response.data.main.temp_max);
  let currentTemperatureMax = document.querySelector("#maxTemp");
  currentTemperatureMax.innerHTML = `${tempMax}º`;

  let tempMin = Math.round(response.data.main.temp_min);
  let currentTemperatureMin = document.querySelector("#minTemp");
  currentTemperatureMin.innerHTML = `${tempMin}º`;

  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${humidity}%`;

  let clouds = response.data.clouds.all;
  let currentClouds = document.querySelector("#clouds");
  currentClouds.innerHTML = ` ${clouds}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#windSpeed");
  currentWindSpeed.innerHTML = ` ${windSpeed} km/h`;

  let iconWeather = document.querySelector("#weatherIcon");
  iconWeather.setAttribute(
    "src",
    `images/weather-icons/${response.data.weather[0].icon}.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);

  let countryFlag = document.querySelector("#countryFlag");
  countryFlag.setAttribute(
    "src",
    `images/flags-icons/${response.data.sys.country}-flag.png`
  );
}

function dispalyForecast(response) {
  let forecastHours = document.querySelector("#forecast");
  forecastHours.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastHours.innerHTML += `
    <div class="col-2">
      
      ${formatHours(forecast.dt * 1000)}      
      <span id="weatherIcn">
        <img src="images/weather-icons/${
          forecast.weather[0].icon
        }.png" width="50px" />
      </span>
    
      <div id=futureTemp>
        <strong>
          ${Math.round(forecast.main.temp_max)}°C
        </strong><br/>
        ${Math.round(forecast.main.temp_min)}°C
      </div>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "4ab71d6f4fc6134dc742018789d66f7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  let apiKey = "4ab71d6f4fc6134dc742018789d66f7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

let CurrentLocButton = document.querySelector("#location-button");
CurrentLocButton.addEventListener("click", clickButton);

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

//FUNCTIONS QUICK SEARCH

function berlin(event) {
  event.preventDefault();
  search("Berlin");
}
let clickBerlin = document.querySelector("#berlin");
clickBerlin.addEventListener("click", berlin);

function london(event) {
  event.preventDefault();
  search("London");
}

let clickLondon = document.querySelector("#london");
clickLondon.addEventListener("click", london);

function madrid(event) {
  event.preventDefault();
  search("Madrid");
}

let clickMadrid = document.querySelector("#madrid");
clickMadrid.addEventListener("click", madrid);

function newYork(event) {
  event.preventDefault();
  search("New York");
}

let clickNewYork = document.querySelector("#newYork");
clickNewYork.addEventListener("click", newYork);

function paris(event) {
  event.preventDefault();
  search("Paris");
}

let clickParis = document.querySelector("#paris");
clickParis.addEventListener("click", paris);

function tokyo(event) {
  event.preventDefault();
  search("Tokyo");
}

let clickTokyo = document.querySelector("#tokyo");
clickTokyo.addEventListener("click", tokyo);

//TEMP CELCIUS OR FAHRENHEIT NOT WORKING NEED TO CORRECT!!

function displayTempF(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemp");

  clickTempCelcius.classList.remove("active");
  clickTempFahrenheit.classList.add("active");

  let temperatureF = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(temperatureF);
}

function displayTempC(event) {
  event.preventDefault();
  clickTempCelcius.classList.add("active");
  clickTempFahrenheit.classList.remove("active");

  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let clickTempFahrenheit = document.querySelector("#fahrenheit");
clickTempFahrenheit.addEventListener("click", displayTempF);

let clickTempCelcius = document.querySelector("#celcius");
clickTempCelcius.addEventListener("click", displayTempC);

search("Lisbon");
