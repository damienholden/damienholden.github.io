import React from "react";
const request = require("request");
var cityName = "";
var request_url;
const OPEN_WEATHER_API = "e16828cc9474d70f6316405aa0b3a2a2"; //get Openweather api from https://openweathermap.org/api
const getWeather = () => {
  return new Promise((resolve, reject) => {
    request_url = `http://api.openweathermap.org/data/2.5/forecast?id=2964574&appid=${OPEN_WEATHER_API}&units=metric`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log('coodorinates:' + navigator.geolocation.getCurrentPosition )
    }
    function showPosition(position) {
     if (position.coords) {
    request_url = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&id=2964574&appid=${OPEN_WEATHER_API}&units=metric`;
     }
     console.log(request_url);
    }
    

    http: request.get(request_url, (err, resp, body) => {
      if (err) reject(err);
      let data = JSON.parse(body);
      console.log(data);
      let response = [data.list[1], data.list[9], data.list[17]];
      cityName = data.city["name"];
      resolve(response);
    });
  });
};

export class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: []
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      getWeather()
        .then(weatherData => {
          weatherData.map(day => {
            const dayObj = {
              day: new Date(day.dt_txt).getDay() - 1,
              temp: day.main.temp,
              icon: day.weather[0].icon
            };
            this.setState({
              arr: this.state.weather.push(dayObj)
            });
          });
        })
        .catch(error => {
          console.log(`Encountered error: `, error);
        });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const weatherData = this.state.weather;

    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const humanText = ["Today", "Tomorrow"];

    return (
      <div className="widget weather">
        <div className="heading">Weather in: {cityName}</div>

        {weatherData.map((day, index) => (
          <div className="group" key={index}>
            <div className="group-heading">
              {index < 2 ? humanText[index] : weekdays[day.day]}
            </div>
            <div className="group-content">
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              />
            </div>
            <div className="temp">{Math.round(day.temp)}°</div>
          </div>
        ))}
      </div>
    );
  }
}
