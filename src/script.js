let todayDate = new Date();

function CurrentDate() {
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

  //let sidebar = document.querySelector("#sidebar");

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = todayDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  if (currentHour >= 5 && currentHour <= 11) {
    greetingUser = "Good Morning";
  }
  if (currentHour >= 12 && currentHour <= 16) {
    greetingUser = "Good Afternoon";
  }
  if (currentHour >= 17 && currentHour <= 23) {
    greetingUser = "Good Evening";
    //sidebar.style.background = "red";
  }
  if (currentHour >= 0 && currentHour <= 4) {
    greetingUser = "Good Evening";
  }

  let welcomeGreeting = document.querySelector("#greeting");
  welcomeGreeting.innerHTML = `${greetingUser}`;

  let sentenceDate = `${currentDay}        ${currentDate} ${currentMonth} ${currentYear}`;
  let sentenceHour = `${currentHour}:${currentMinute}`;

  let date = document.querySelector("#currentDay");
  date.innerHTML = sentenceDate;

  let hour = document.querySelector("#currentTime");
  hour.innerHTML = sentenceHour;
  console.log(currentHour);
  console.log(currentMinute);
}

CurrentDate(todayDate);

//SEARCH CITY WEATHER

function displayWeather(response) {
  console.log(response.data);

  let nameCity = response.data.name;
  console.log(nameCity);
  let Location = document.querySelector("#currentCity");
  Location.innerHTML = nameCity;

  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let CurrentTemperature = document.querySelector("#currentTemp");
  CurrentTemperature.innerHTML = `${temp}º`;

  let tempMax = Math.round(response.data.main.temp_max);
  let CurrentTemperatureMax = document.querySelector("#maxTemp");
  CurrentTemperatureMax.innerHTML = `${tempMax}º`;

  let tempMin = Math.round(response.data.main.temp_min);
  let CurrentTemperatureMin = document.querySelector("#minTemp");
  CurrentTemperatureMin.innerHTML = `${tempMin}º`;

  let description = response.data.weather[0].main;
  console.log(description);
  let CurrentDescription = document.querySelector("#description");
  CurrentDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  console.log(humidity);
  let CurrentHumidity = document.querySelector("#humidity");
  CurrentHumidity.innerHTML = ` ${humidity}%`;

  let clouds = response.data.clouds.all;
  console.log(clouds);
  let CurrentClouds = document.querySelector("#clouds");
  CurrentClouds.innerHTML = ` ${clouds}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  console.log(windSpeed);
  let CurrentWindSpeed = document.querySelector("#windSpeed");
  CurrentWindSpeed.innerHTML = ` ${windSpeed} km/h`;

  let countryFlag = document.querySelector("#countryFlag");
  countryFlag.setAttribute(
    "src",
    `images/flags-icons/${response.data.sys.country}-flag.png`
  );

  let iconWeather = document.querySelector("#weatherIcon");
  iconWeather.setAttribute(
    "src",
    `images/weather-icons/${response.data.weather[0].icon}.png`
  );
  console.log(response.data.weather[0].icon);
}

function search(city) {
  let apiKey = "4ab71d6f4fc6134dc742018789d66f7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input").value;
  console.log(city);
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

search("Lisbon");

//TEMP CELCIUS OR FAHRENHEIT NOT WORKING NEED TO CORRECT!!

//function displayTempF(event) {
//event.preventDefault();
//let CurrentTemperature = document.querySelector("#currentTemp");
// CurrentTemperature.innerHTML = 88;}

//let clickTempCelcius = document.querySelector("#celcius");
//clickTempCelcius.addEventListener("click", displayTempC);

//let clickTempFahrenheit = document.querySelector("#fahrenheit");
//clickTempFahrenheit.addEventListener("click", displayTempF);
