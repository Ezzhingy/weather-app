import "./App.css";
import magnify from "./magnify.svg";

import { DayInfo } from "./components/dayInfo/DayInfo";
import { WeekInfo } from "./components/weekInfo/WeekInfo";
import { GetMap } from "./components/getMap/GetMap";

import { useEffect } from "react";

function App() {
  const resetInput = () => {
    const locationInput = document.getElementById("location");
    locationInput.value = "";

    const errorHandling = document.getElementById("error-handling");
    errorHandling.innerText = "";
  };

  useEffect(() => {
    const locationBtn = document.getElementById("location-btn");
    locationBtn.addEventListener("click", resetInput);
  }, []);

  return (
    <div className="App">
      <GetMap />
      <div id="user-input">
        <div id="location-container">
          <input id="location" type="text" placeholder="Search location..." />
          <button id="location-btn">
            <img src={magnify} alt="Search" height={30} />
          </button>
        </div>
        <div id="error-handling"></div>
      </div>
      <DayInfo />
      <WeekInfo />
      <div className="footer">
        <p>
          Copyright © <a href="https://github.com/Ezzhingy">Ezzhingy</a> 2022
        </p>
      </div>
    </div>
  );
}

export default App;
