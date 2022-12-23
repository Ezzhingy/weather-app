import "./get-map.css";

import { useEffect } from "react";

export const GetMap = () => {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    async function refreshMap() {
      const z = randomIntFromInterval(0, 2);
      const x = randomIntFromInterval(0, z);
      const y = randomIntFromInterval(0, z);

      const locationInput = document.getElementById("location");
      const location =
        locationInput.value === "" ? "london" : locationInput.value;
      try {
        const locationPromise = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=7c7ac1d1a3ebbb2a4e6ee344cc6cc97b`,
          { mode: "cors" }
        );
        const locationJson = await locationPromise.json();
        if (locationJson.message !== 0) {
          const weatherImg = document.getElementById("weather-img");
          weatherImg.src = "#";
        } else {
          const weatherPromise = await fetch(
            `https://tile.openweathermap.org/map/temp/${z}/${x}/${y}.png?appid=7c7ac1d1a3ebbb2a4e6ee344cc6cc97b`,
            { mode: "cors" }
          );
          const weatherBlob = await weatherPromise.blob();
          const weatherURL = URL.createObjectURL(weatherBlob);

          const weatherImg = document.getElementById("weather-img");
          weatherImg.src = weatherURL;
        }
      } catch (error) {
        const errorHandling = document.getElementById("error-handling");
        errorHandling.innerText =
          "Location not found. Search must be in the form of 'City', 'City, State' or 'City, Country'.";
      }
    }

    const locationBtn = document.getElementById("location-btn");

    refreshMap();
    locationBtn.addEventListener("click", refreshMap);

    return () => {
      document.removeEventListener("click", refreshMap);
    };
  });

  return (
    <div id="weather-container">
      <div>
        <h1>Temperature Map</h1>
        <img id="weather-img" src="#"></img>
      </div>
    </div>
  );
};
