import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./styles/App.css";
import snowVideo from "./assets/videos/snow.mp4";
import rainVideo from "./assets/videos/rain.mp4";
import clearVideo from "./assets/videos/clear.mp4";
import cloudsVideo from "./assets/videos/clouds.mp4";
import sunnyVideo from "./assets/videos/sunny.mp4";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found");
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- VIDEO LOGIC ----------------

  let backgroundVideo = null;

  if (weatherData) {
    const condition = weatherData.weather[0].main;

    switch (condition) {
      case "Rain":
      case "Drizzle":
      case "Thunderstorm":
        backgroundVideo = rainVideo;
        break;

      case "Clouds":
        backgroundVideo = cloudsVideo;
        break;

      case "Clear":
        backgroundVideo = clearVideo;
        break;
      case "Snow":
        backgroundVideo=snowVideo;
        break;
        
      default:
        backgroundVideo = sunnyVideo;
    }
  }

  // ------------------------------------------------

  return (
    <div className="app">

      {/* Background Video */}
      {backgroundVideo && (
        <video
          key={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Transparent Overlay */}
      <div className="overlay"></div>

      {/* Existing Content */}
      <div className="content">
        <h1 className="main-heading">Weather App</h1>

        <SearchBar getWeather={getWeather} />

        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>

    </div>
  );
}

export default App;