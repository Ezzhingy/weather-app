import "./App.css";
import { DayInfo } from "./components/dayInfo/DayInfo";
import { WeekInfo } from "./components/weekInfo/WeekInfo";

function App() {
  return (
    <div className="App">
      <div id="container1">
        <input id="location" type="text" placeholder="Search location..." />
        <button>Submit</button>
      </div>
      <DayInfo />
      <WeekInfo />
    </div>
  );
}

export default App;
