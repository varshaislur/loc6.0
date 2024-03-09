import { Outlet } from "react-router-dom";
import "./App.css";
import Navitems from "./Components/Navitems";

function App() {
  return (
    <div className="App">
      <Navitems/>
      <Outlet />
    </div>
  );
}

export default App;
