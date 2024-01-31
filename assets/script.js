const apiKey = 'f1ebbe8b41a96fea2d1bd07f69951241';
var cityName = 'Salt Lake City';
var searchBtn = $("#searchBtn");
var temperature;
var date;
var wind;
var humidity;
var icon;

var addSearchHistoryButton = function(cityName) {
  var historyContainer = $("#searchHistory");

  var existingButton = historyContainer.find('.history-btn:contains("' + cityName + '")');

  if (existingButton.length > 0) {
    existingButton.closest('li').remove();
  }

  var historyButton = $('<li class="list-group-item" style="border: none"><button class="btn btn-secondary history-btn">' + cityName + '</button></li>');
  historyContainer.append(historyButton);

  historyButton.on("click", function() {
    $("#cityInput").val(cityName);
    search();
  });
};

var getWeatherData = function () {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      handleWeatherData(data);
      addSearchHistoryButton(cityName);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
};

var handleWeatherData = function (data) {
  $(".forecast-cards").empty();
  if (data.list && data.list.length > 0) {
    for (i = 0; i < 5; i++) {
      var forecast = data.list[i*8];
    
      temperature = (1.8*((forecast.main.temp)-273)+32).toFixed(2);
      humidity = forecast.main.humidity;
      wind = forecast.wind.speed;
      date = forecast.dt_txt;
      icon = forecast.weather[0].icon

      createCard();
    }
  } else {
    console.error('Unable to retrieve weather info from the API response');
  }
};

var createCard = function() {
  var card = $('<div class="card" style="width: 12rem; padding: 10px; margin: 0px 10px; background: royalblue;">'+
    '<div class="card-body">'+
      '<h5 class="card-title">' + date + '</h5>'+
      '<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png" class="card-img" alt="Weather Icon">'+
    '</div>'+
    '<ul class="list-group list-group-flush">'+
      '<li class="list-group-item">Temp: ' + temperature +  ' °F</li>'+
      '<li class="list-group-item">Wind: ' + wind + ' MPH</li>'+
      '<li class="list-group-item">Humidity: ' + humidity + '%</li>'+
    '</ul>'+
  '</div>');

  $(".forecast-cards").append(card);
};

function search() {
  cityName = $("#cityInput").val();
  var cityTitle = $("#cityTitle");
  cityTitle.text(cityName);
  getWeatherData();
}

searchBtn.on("click", search);

$("#searchHistory").on("click", ".history-btn", function() {
  $("#cityInput").val($(this).text());
  search();
});

getWeatherData();