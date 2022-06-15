import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Requests } from "./pages/Requests";
import { Licenses } from "./pages/Licenses";
import { useMantineTheme } from '@mantine/core';
import { AboutUs } from "./pages/admin/AboutUs";
import { Admin } from "./pages/Admin";
import { AdminLicenses } from "./pages/admin/Licenses";
import { RequireAuth } from "./util/SmartAuth";
import { Error } from "./pages/Error";

export default function App() {
  const theme = useMantineTheme();
  return (
    <Router>
      <NavBar />
      <div className="pages" style={{ background: theme.colors.dark[8] }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/melden" element={<Register />} />
          <Route path="/antraege" element={<RequireAuth ><Requests /></RequireAuth>} />
          <Route path="/genehmigungen" element={<RequireAuth  ><Licenses /></RequireAuth>} />
          <Route path="/admin/aboutus" element={<AboutUs />} />
          <Route path="/admin/genehmigungen" element={<AdminLicenses />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}
