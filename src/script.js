//Date and Hour functions
let todayDate = new Date();
let units = "metric";

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
      "linear-gradient(-225deg, #7085B6 0%, #87A7D9 10%, #DEF3F8 100%)"; //blue sky
  }
  if (currentHour >= 12 && currentHour <= 16) {
    greetingUser = "Good Afternoon";
    sidebar.style.background =
      "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%) "; //purple
  }
  if (currentHour >= 17 && currentHour <= 23) {
    greetingUser = "Good Evening";
    sidebar.style.background =
      "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)"; //strong blue
  }
  if (currentHour >= 0 && currentHour <= 4) {
    greetingUser = "Good Evening";
    sidebar.style.background =
      "linear-gradient(to right, #868f96 0%, #596164 100%) "; //grey
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

/////////// DISPLAY WEATHER CURRENT AND HOURLY FORECAST

function displayWeather(response) {
  let nameCity = response.data.name;
  let location = document.querySelector("#currentCity");
  location.innerHTML = nameCity;

  let tempC = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = `${tempC}`;

  let feelTemp = Math.round(response.data.main.feels_like);
  let currentFeelTemp = document.querySelector("#feelTemp");
  currentFeelTemp.innerHTML = `${feelTemp}`;

  let description = response.data.weather[0].description;
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

function displayForecast(response) {
  let forecastHours = document.querySelector("#forecast");
  forecastHours.innerHTML = null;
  for (let i = 0; i < 6; i++) {
    let forecastDegrees = response.data.list[i].main.temp;
    forecastHours.innerHTML += `
    <div class="col-2">
      ${formatHours(response.data.list[i].dt * 1000)}      
      <span id="weatherIcn">
        <img src="images/weather-icons/${
          response.data.list[i].weather[0].icon
        }.png" width="50px" />
      </span>
    
      <div> <span class="futureTemp">
      ${Math.round(forecastDegrees)}</span> <strong>°</strong>
        
      </div>
  `;
  }
}

///////// SEARCH FORM CITY FUNCTIONS

function search(city) {
  let apiKey = "4ab71d6f4fc6134dc742018789d66f7f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather).catch(errorFunction);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function errorFunction(error) {
  alert("Location not found. Please check your entry and try again.");
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  city.trim();
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

///////// CURRENT LOCATION FUNCTIONS

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4ab71d6f4fc6134dc742018789d66f7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let CurrentLocButton = document.querySelector("#location-button");
CurrentLocButton.addEventListener("click", clickButton);

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

////////// FUNCTIONS CITY QUICK SEARCH
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

//////////// UNITS CELCIUS OR FAHRENHEIT

function toFahrenheit(celsius) {
  let fahrenheit = Math.round(celsius * (9 / 5) + 32);
  return fahrenheit;
}

function toCelsius(fahrenheit) {
  let celsius = Math.round((fahrenheit - 32) / (9 / 5));
  return celsius;
}

function changeTempUnit() {
  let currentDegrees = document.querySelector("#currentTemp");
  let currentFeelDegrees = document.querySelector("#feelTemp");
  let forecastDegrees = document.querySelectorAll(".futureTemp");

  let tempUnitElement = document.querySelector("#switchDegree");

  ///////// Switches between Celsius and Fahrenheit
  if (units === "metric") {
    currentDegrees.innerHTML = toFahrenheit(currentDegrees.innerHTML);
    currentFeelDegrees.innerHTML = toFahrenheit(currentFeelDegrees.innerHTML);

    tempUnitElement.innerHTML = `<img src="images/other/celsius.png" width="30px" />
    `;
    for (let i = 0; i < 6; i++) {
      forecastDegrees[i].innerHTML = toFahrenheit(forecastDegrees[i].innerHTML);
    }
    units = "imperial";
  } else {
    currentDegrees.innerHTML = toCelsius(currentDegrees.innerHTML);
    currentFeelDegrees.innerHTML = toCelsius(currentFeelDegrees.innerHTML);

    tempUnitElement.innerHTML = `<img src="images/other/fahrenheit.png" width="30px" />
    `;
    for (let i = 0; i < 6; i++) {
      forecastDegrees[i].innerHTML = toCelsius(forecastDegrees[i].innerHTML);
    }
    units = "metric";
  }
}

let switchTemp = document.querySelector("#switchDegree");
switchTemp.addEventListener("click", changeTempUnit);

search("Lisbon");
/////////////
