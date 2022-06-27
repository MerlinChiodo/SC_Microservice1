import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Account } from "./pages/Account";
import { Licenses } from "./pages/Licenses";
import { useMantineTheme } from '@mantine/core';
import { AboutUs } from "./pages/admin/AboutUs";
import { Admin } from "./pages/Admin";
import { AdminLicenses } from "./pages/admin/Licenses";
import { RequireAuth, RequireAdmin } from "./util/SmartAuth";
import { Error } from "./pages/Error";
import { AccountChanges } from "./pages/admin/AccountChanges";

export default function App() {

  const theme = useMantineTheme();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="pages" style={{ background: theme.colors.dark[8] }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/melden" element={<Register />} />
          <Route path="/account" element={<RequireAuth isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} ><Account /></RequireAuth>} />
          <Route path="/genehmigungen" element={<RequireAuth isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} ><Licenses /></RequireAuth>} />
          <Route path="/admin/aboutus" element={<RequireAdmin isAdmin={isAdmin} setAdmin={setAdmin}><AboutUs /></RequireAdmin>} />
          <Route path="/admin/genehmigungen" element={<RequireAdmin isAdmin={isAdmin} setAdmin={setAdmin}><AdminLicenses /></RequireAdmin>} />
          <Route path="/admin/accountchanges" element={<RequireAdmin isAdmin={isAdmin} setAdmin={setAdmin}><AccountChanges /></RequireAdmin>} />
          <Route path="/admin" element={<RequireAdmin isAdmin={isAdmin} setAdmin={setAdmin}><Admin /></RequireAdmin>} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}
