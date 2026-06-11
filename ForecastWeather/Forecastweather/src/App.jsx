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

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );

  const saveSearch = (city) => {
    let updatedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Remove duplicates
    updatedHistory = updatedHistory.filter(
      (item) => item.toLowerCase() !== city.toLowerCase()
    );

    // Add new city at top
    updatedHistory.unshift(city);

    // Keep only last 10 searches
    updatedHistory = updatedHistory.slice(0, 10);

    localStorage.setItem(
      "searchHistory",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);
  };

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

      // Save searched city
      saveSearch(city);
    } catch (error) {
      console.log(error);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  // Background Video Logic

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
        backgroundVideo = snowVideo;
        break;

      default:
        backgroundVideo = sunnyVideo;
    }
  }

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

      <div className="overlay"></div>

      <div className="content">
        <h1 className="main-heading">Weather App</h1>

        <SearchBar getWeather={getWeather} />

        {weatherData && (
          <WeatherCard weatherData={weatherData} />
        )}

        {/* Search History */}
        {history.length > 0 && (
          <>
            <h3>Recent Searches</h3>

            <div className="history-container">
              {history.map((city, index) => (
                <span
                  key={index}
                  className="history-chip"
                  onClick={() => getWeather(city)}
                >
                  {city}
                </span>
              ))}
            </div>

            <button onClick={clearHistory}>
              Clear History
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;