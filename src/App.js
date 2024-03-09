import Banner from "./Home/Banner";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navitems from "./Components/Navitems";

function App() {
  return (
    <div className="App">
       <Navitems/>
      <Banner/>
      <Outlet />
    </div>
  );
}

export default App;
