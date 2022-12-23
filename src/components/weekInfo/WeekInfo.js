import "./week-info.css";
import { useEffect } from "react";

export const WeekInfo = () => {
  const getWordDay = (jsonData, i) => {
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };
    let today = new Date();
    today = today.toISOString().split("T")[0];

    if (today !== jsonData.list[i].dt_txt.split(" ")[0]) {
      const dayOfWeek = new Date(jsonData.list[i].dt_txt.split(" ")[0]);
      const day = days[dayOfWeek.getDay() + 1];
      return day;
    } else {
      return null;
    }
  };

  useEffect(() => {
    async function refreshWeekly() {
      const locationInput = document.getElementById("location");
      const location =
        locationInput.value === "" ? "london" : locationInput.value;

      try {
        const locationPromise = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=7c7ac1d1a3ebbb2a4e6ee344cc6cc97b`,
          { mode: "cors" }
        );
        const locationJson = await locationPromise.json();

        const bigContainer = document.getElementById("right-container");
        bigContainer.innerHTML = "";

        for (let i = 0; i < locationJson.list.length; i += 8) {
          const smallContainer = document.createElement("div");
          smallContainer.classList.add("small-container");

          const smallP = document.createElement("h2");
          smallP.classList.add("small-p");

          const smallTemp = document.createElement("h1");
          smallTemp.classList.add("small-temp");

          const day = getWordDay(locationJson, i);

          if (day !== null) {
            smallP.innerText = day;
            smallTemp.innerText = `${Math.round(
              locationJson.list[i].main.temp
            )}°C`;
            smallContainer.appendChild(smallP);
            smallContainer.appendChild(smallTemp);
            bigContainer.appendChild(smallContainer);
          }
        }
      } catch (error) {
        const errorHandling = document.getElementById("error-handling");
        errorHandling.innerText =
          "Location not found. Search must be in the form of 'City', 'City, State' or 'City, Country'.";
      }
    }

    const locationBtn = document.getElementById("location-btn");

    refreshWeekly();
    locationBtn.addEventListener("click", refreshWeekly);

    return () => {
      document.removeEventListener("click", refreshWeekly);
    };
  });

  return <div id="right-container"></div>;
};
