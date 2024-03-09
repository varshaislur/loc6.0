import Banner from "./Home/Banner";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navitems from "./Components/Navitems";

function App() {
  return (
    <div className="App">
      <Banner/>
      <Navitems/>
      <Outlet />
    </div>
  );
}

export default App;
