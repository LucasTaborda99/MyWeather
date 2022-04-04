let weather = {
  apiKey: '91af68eb32548bbc17e3efda9f940fd2',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q= ' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then(response => {
        if (!response.ok) {
          alert('No city found.')
        }
        return response.json()
      })
      .then(data => this.displayWeather(data))
  },
  displayWeather: function (data) {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind
    //console.log(data)
    // console.log(name,icon,description,temp,humidity,speed)
    document.querySelector('.city').innerText = 'Weather in ' + name
    document.querySelector('.temperature').innerText = temp + ' °C'
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png'
    document.querySelector('.description').innerText = description
    document.querySelector('.humidity').innerHTML =
      'Humidity: ' + humidity + '%'
    document.querySelector('.wind').innerText = 'Wind speed: ' + speed + ' km/h'
    document.querySelector('.loading').classList.remove('loading')
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value)
  }
}

document.querySelector('.search button').addEventListener('click', function () {
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" +
    document.querySelector('.search-bar').value +
    "')"
  weather.search()
})

document
  .querySelector('.search-bar')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" +
        document.querySelector('.search-bar').value +
        "')"
      weather.search()
    }
  })

let time = {
  apiKey: 'dfeadb30f9e448cd9bbdc8e05d6b5620',
  fetchTime: function (city) {
    fetch(
      'https://api.ipgeolocation.io/timezone?apiKey=' +
        this.apiKey +
        '&location=' +
        city
    )
      .then(response => {
        if (!response.ok) {
          alert('No city found.')
        }
        return response.json()
      })
      .then(data => this.displayTime(data))
  },
  displayTime: function (data) {
    const { date } = data
    const { time_24 } = data
    console.log(data)
    // console.log(date, time_24)
    document.querySelector('.date').innerHTML = 'Date: ' + date
    document.querySelector('.time').innerHTML = 'Time: ' + time_24
  },
  searchTime: function () {
    this.fetchTime(document.querySelector('.search-bar').value)
  }
}

document.querySelector('.search button').addEventListener('click', function () {
  time.searchTime()
})

document
  .querySelector('.search-bar')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      time.searchTime()
    }
  })
