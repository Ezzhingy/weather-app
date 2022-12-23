import "./App.css";
import "./responsive.css";
import magnify from "./magnify.svg";

import { DayInfo } from "./components/dayInfo/DayInfo";
import { WeekInfo } from "./components/weekInfo/WeekInfo";

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
      <div id="user-input">
        <div id="location-container">
          <input id="location" type="text" placeholder="Search location..." />
          <button id="location-btn">
            <img src={magnify} alt="Search" height={40} />
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
