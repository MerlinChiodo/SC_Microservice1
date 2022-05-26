import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Requests } from "./pages/Requests";
import { Licenses } from "./pages/Licenses";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/melden" element={<Register />} />
          <Route path="/antraege" element={<Requests />} />
          <Route path="/genehmigungen" element={<Licenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
