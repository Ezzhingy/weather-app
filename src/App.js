import "./App.css";
import magnify from "./magnify.svg";

import { DayInfo } from "./components/dayInfo/DayInfo";
import { WeekInfo } from "./components/weekInfo/WeekInfo";

function App() {
  const resetInput = () => {
    const locationInput = document.getElementById("location");
    locationInput.innerText = "";
  };

  return (
    <div className="App">
      <div>testing</div>
      <div id="user-input">
        <input id="location" type="text" placeholder="Search location..." />
        <button id="location-btn" onClick={resetInput}>
          <img src={magnify} alt="Search" height={30} />
        </button>
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
