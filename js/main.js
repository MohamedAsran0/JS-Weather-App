
var todayElement = document.getElementById('today');
var tomorrowElement = document.getElementById('tomorrow');
var afterTomorrowElement = document.getElementById('afterTomorrow');

var searchElement = document.getElementById('search');
var searchBtnElement = document.getElementById('searchBtn');

var loc;

var weatherData = {};

fetch('https://free.freeipapi.com/api/json/')
  .then(function (x) {
    return x.json();
  }).then(function (y) {
    loc = y.capital;
    getWeather();
  }).catch(function () {
    loc = 'cairo';
    getWeather();
  });


function getWeather() {
  fetch('https://api.weatherapi.com/v1/forecast.json?key=b1930391c3f7443e8b9185856253006%20&q=' + loc + '&days=3')
    .then(function (x) {
      return x.json();
    }).then(function (y) {

      weatherData = {
        todayName: getDayName(y.forecast.forecastday[0].date),
        todayDate: convertDate(y.forecast.forecastday[0].date),
        todayLocation: y.location.name,
        todayDegree: y.current.temp_c,
        todayDegreeImg: y.current.condition.icon,
        todayCondition: y.current.condition.text,
        todayHumidity: y.current.humidity,
        todayWind: y.current.wind_kph,
        todayDirection: y.current.wind_dir,

        tomorrowName: getDayName(y.forecast.forecastday[1].date),
        tomorrowDegreeImg: y.forecast.forecastday[1].day.condition.icon,
        tomorrowDegree: y.forecast.forecastday[1].day.maxtemp_c,
        tomorrowDegreeLow: y.forecast.forecastday[1].day.mintemp_c,
        tomorrowCondition: y.forecast.forecastday[1].day.condition.text,

        afterTomorrowName: getDayName(y.forecast.forecastday[2].date),
        afterTomorrowDegreeImg: y.forecast.forecastday[2].day.condition.icon,
        afterTomorrowDegree: y.forecast.forecastday[2].day.maxtemp_c,
        afterTomorrowDegreeLow: y.forecast.forecastday[2].day.mintemp_c,
        afterTomorrowCondition: y.forecast.forecastday[2].day.condition.text,
      }

      displayData();

    }).catch(function () { });
}



searchElement.addEventListener('input', function () {
  loc = this.value;
  getWeather();
});

searchBtnElement.addEventListener('click', function () {
  loc = this.value;
  getWeather();
});





function displayData() {
  todayElement.innerHTML = `<div class="today-title d-flex justify-content-between align-items-center">
                                <p class="m-0 pt-2 pb-2 ps-2">${weatherData.todayName}</p>
                                <p class="m-0 pt-2 pb-2 pe-2">${weatherData.todayDate}</p>
                            </div>

                            <div class="today-content p-4 pe-0">
                                <div class="location">
                                    <p class="mb-0">${weatherData.todayLocation}</p>
                                </div>

                                <div class="degree">
                                    <p class="mb-0">${weatherData.todayDegree}&deg;C</p>
                                    <div class="img">
                                        <img src="https:${weatherData.todayDegreeImg}" alt="${weatherData.todayCondition}">
                                    </div>
                                </div>

                                <div class="condition">
                                    <p>${weatherData.todayCondition}</p>
                                </div>

                                <div class="readings">
                                    <span>
                                        <img src="./images/icon-umberella@2x.png" alt="humidity">
                                        <p>${weatherData.todayHumidity}%</p>
                                    </span>
                                    <span>
                                        <img src="./images/icon-wind@2x.png" alt="wind">
                                        <p>${weatherData.todayWind}km/h</p>
                                    </span>
                                    <span>
                                        <img src="./images/icon-compass@2x.png" alt="compass">
                                        <p>${weatherData.todayDirection}</p>
                                    </span>
                                </div>
                            </div>`;



  tomorrowElement.innerHTML = `<div class="tomorrow-title text-center">
                                <p class="m-0 pt-2 pb-2">${weatherData.tomorrowName}</p>
                            </div>

                            <div class="tomorrow-content d-flex flex-column justify-content-center align-items-center">
                                <div class="img mt-3 mb-3">
                                    <img src="https:${weatherData.tomorrowDegreeImg}" alt="${weatherData.tomorrowCondition}">
                                </div>

                                <div class="degree d-flex flex-column align-items-center">
                                    <p class="mb-0">${weatherData.tomorrowDegree}&deg;C</p>
                                    <span>${weatherData.tomorrowDegreeLow}&deg;</span>
                                </div>

                                <div class="condition">
                                    <p class="mt-3 mb-3">${weatherData.tomorrowCondition}</p>
                                </div>
                            </div>`;



  afterTomorrowElement.innerHTML = `<div class="after-tomorrow-title text-center">
                                <p class="m-0 pt-2 pb-2">${weatherData.afterTomorrowName}</p>
                            </div>

                            <div
                                class="after-tomorrow-content d-flex flex-column justify-content-center align-items-center">
                                <div class="img mt-3 mb-3">
                                    <img src="https:${weatherData.afterTomorrowDegreeImg}" alt="${weatherData.afterTomorrowCondition}">
                                </div>

                                <div class="degree d-flex flex-column align-items-center">
                                    <p class="mb-0">${weatherData.afterTomorrowDegree}&deg;C</p>
                                    <span>${weatherData.afterTomorrowDegreeLow}&deg;</span>
                                </div>

                                <div class="condition">
                                    <p class="mt-3 mb-3">${weatherData.afterTomorrowCondition}</p>
                                </div>
                            </div>`;
}



var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function convertDate(date_str) {
  temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1];
}


var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function getDayName(dayDate) {
  var date = new Date(dayDate);
  var day = date.getDay();
  return dayNames[day];
}
