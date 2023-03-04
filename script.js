console.log('heej');

let weather = {
  apiKey: 'e97b59ec8e1b67cd87a60b923698c639',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then(response => response.json())
      .then(data => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector('.weather-title').innerText = 'Weather in ' + name;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.description-text').innerText = description;
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind-speed').innerText =
      'Wind speed: ' + speed + 'km/h';
    document.querySelector('.description-image').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    weather.search();
  }
});

weather.fetchWeather('Beograd');
