import "./day-info.css";
import { useState, useEffect } from "react";

export const DayInfo = ({ location }) => {
  const updateCenter = (jsonData) => {
    const descriptionP = document.getElementById("descriptionP");
    const locationP = document.getElementById("locationP");
    const tempP = document.getElementById("tempP");

    descriptionP.innerText = jsonData.weather[0].description;
    locationP.innerText = jsonData.name;
    tempP.innerText = `${Math.round(jsonData.main.temp)}°C`;
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
        console.log(locationJson);

        updateCenter(locationJson);
        updateBg(locationJson);
      } catch (error) {
        console.log("add error handling");
      }
    }

    const locationBtn = document.getElementById("location-btn");

    refreshDaily();
    locationBtn.addEventListener("click", refreshDaily);
  }, []);

  return (
    <div className="center-info">
      <div>
        <h2 id="descriptionP"></h2>
        <h3 id="locationP"></h3>
        <h1 id="tempP"></h1>
      </div>
      <div className="gif-container"></div>
      <div className="bottom-info"></div>
    </div>
  );
};
