import Banner from "./Home/Banner";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navitems from "./Components/Navitems";
import HomeCategory from "./Home/HomeCategory";

function App() {
  return (
    <div className="App">
      <Navitems />
      <div className="min-vh-100">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
