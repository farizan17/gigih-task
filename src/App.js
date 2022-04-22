import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";


import Home from "./pages/home";
import Login from "./pages/implicit_grant/App";
import Dashboard from "./pages/dashboard/dashboard";
import Header from "./components/header/header";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="main-contianer">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster/>
      </Router>
    </div>
  );
}
export default App;
