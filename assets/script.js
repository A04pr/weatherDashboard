const apiKey = 'f1ebbe8b41a96fea2d1bd07f69951241';
var cityName = 'Seattle';
var temperature;
var date;
var wind;
var humidity;

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
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
};

var handleWeatherData = function (data) {
  if (data.list && data.list.length > 0) {
    for (i = 0; i < 5; i++) {
      var forecast = data.list[i*8];
    
      temperature = (1.8*((forecast.main.temp)-273)+32).toFixed(2);
      humidity = forecast.main.humidity;
      wind = forecast.wind.speed;
      date = forecast.dt_txt;

      createCard();
  
      console.log('Day: ', date)
      console.log('Temperature: ', temperature);
      console.log('Humidity: ', humidity);
      console.log('Wind: ', wind);

    }
  } else {
    console.error('Unable to retrieve weather info from the API response');
  }
};

var createCard = function() {
  var card = $('<div class="card" style="width: 18rem;">'+
    '<div class="card-body">'+
      '<h5 class="card-title">' + date + '</h5>'+
      '<img src="..." class="card-img" alt="Weather Icon">'+
    '</div>'+
    '<ul class="list-group list-group-flush">'+
      '<li class="list-group-item">Temp: ' + temperature +  ' °F</li>'+
      '<li class="list-group-item">Wind: ' + wind + ' MPH</li>'+
      '<li class="list-group-item">Humidity: ' + humidity + ' %</li>'+
    '</ul>'+
  '</div>');

  $(".forecast-cards").append(card);
};

getWeatherData();