import { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({ getWeather }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim() === "") return;

    getWeather(city);
    setCity("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;