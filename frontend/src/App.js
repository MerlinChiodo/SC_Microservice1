import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Requests } from "./pages/Requests";
import { Licenses } from "./pages/Licenses";
import { useMantineTheme } from '@mantine/core';
import { AdminPage } from "./pages/Admin";

function App() {
  const theme = useMantineTheme();
  return (
    <Router>
      <NavBar />
      <div className="pages" style={{ background: theme.colors.dark[8] }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/melden" element={<Register />} />
          <Route path="/antraege" element={<Requests />} />
          <Route path="/genehmigungen" element={<Licenses />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
