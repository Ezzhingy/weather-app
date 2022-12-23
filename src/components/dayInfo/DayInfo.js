import "./day-info.css";
import { useEffect } from "react";

export const DayInfo = () => {
  const updateCenter = (jsonData) => {
    const days = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    const descriptionP = document.getElementById("descriptionP");
    const locationP = document.getElementById("locationP");
    const tempP = document.getElementById("tempP");

    const today = new Date();

    descriptionP.innerText = jsonData.weather[0].description;
    locationP.innerText = `${jsonData.name} (${days[today.getDay()]})`;
    tempP.innerText = `${Math.round(jsonData.main.temp)}°C`;
  };

  const updateBot = (jsonData) => {
    const low = document.getElementById("low");
    const feelsLike = document.getElementById("feels-like");
    const high = document.getElementById("high");

    low.innerText = `${Math.round(jsonData.main.temp_min)}°C`;
    feelsLike.innerText = `${Math.round(jsonData.main.feels_like)}°C`;
    high.innerText = `${Math.round(jsonData.main.temp_max)}°C`;
  };

  const updateBg = (jsonData) => {
    const app = document.querySelector(".App");
    if (Math.round(jsonData.main.temp) <= 0) {
      app.classList.add("snow");
      app.classList.remove("spring");
    } else {
      app.classList.add("spring");
      app.classList.remove("snow");
    }
  };

  async function updateGif(jsonData) {
    const gifTemp = document.getElementById("gif-temp");
    const gifDescription = jsonData.weather[0].description;

    try {
      const responseGif = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=NqeKNP3enWa8n5Rq9nYxyV9wc0hx9ljI&s=${gifDescription.replaceAll(
          " ",
          "-"
        )}`,
        { mode: "cors" }
      );
      const picData = await responseGif.json();
      gifTemp.src = picData.data.images.original.url;
    } catch (error) {
      console.log("gif error, no gif found");
    }
  }

  useEffect(() => {
    async function refreshDaily() {
      const locationInput = document.getElementById("location");
      const location =
        locationInput.value === "" ? "london" : locationInput.value;

      try {
        const locationPromise = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7c7ac1d1a3ebbb2a4e6ee344cc6cc97b`,
          { mode: "cors" }
        );
        const locationJson = await locationPromise.json();

        updateCenter(locationJson);
        updateBot(locationJson);
        updateBg(locationJson);
        updateGif(locationJson);
      } catch (error) {
        console.log("invalid location, please try again");
      }
    }

    const locationBtn = document.getElementById("location-btn");

    refreshDaily();
    locationBtn.addEventListener("click", refreshDaily);

    return () => {
      document.removeEventListener("click", refreshDaily);
    };
  });

  return (
    <div className="center-info">
      <div>
        <h2 id="descriptionP"></h2>
        <h3 id="locationP"></h3>
        <h1 id="tempP"></h1>
      </div>
      <div className="gif-container">
        <img id="gif-temp" src="#"></img>
      </div>
      <div className="bottom-info">
        <div className="bot-container">
          <h2>Low</h2>
          <h2 id="low"></h2>
        </div>
        <div className="bot-container">
          <h2 id="feels-like-text">Feels Like</h2>
          <h2 id="feels-like"></h2>
        </div>
        <div className="bot-container">
          <h2>High</h2>
          <h2 id="high"></h2>
        </div>
      </div>
    </div>
  );
};
