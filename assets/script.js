const apiKey = '';
var cityName = 'Seattle';

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
    for (i = 0; i <= 5; i++) {
      var forecast = data.list[i];
    
      var temperature = 1.8*((forecast.main.temp)-273)+32;
      var humidity = forecast.main.humidity;
      var wind = forecast.wind.speed;
  
      console.log('Day: ', i)
      console.log('Temperature: ', temperature);
      console.log('Humidity: ', humidity);
      console.log('Wind: ', wind);

    }
  } else {
    console.error('Unable to retrieve weather info from the API response');
  }
};

getWeatherData();