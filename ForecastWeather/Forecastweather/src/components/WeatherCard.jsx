import Clock from "./Clock";
import "../styles/WeatherCard.css";

function WeatherCard({ weatherData }) {
  const city = weatherData.name;
  const temp = weatherData.main.temp;
  const condition = weatherData.weather[0].main;
  const icon = weatherData.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div className="weather-card">
      <h2>{city}</h2>

      <img src={iconUrl} alt="weather-icon" />

      <h1>{temp}°C</h1>

      <p>{condition}</p>

      <Clock />
    </div>
  );
}

export default WeatherCard;