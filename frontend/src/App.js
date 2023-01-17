import "./App.css";
import React from "react";
import Home from "./components/main";
import Add from "./components/add";
import Update from "./components/update";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/addMeeting" exact element={<Add />} />
          <Route path="/updateMeeting" exact element={<Update />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
