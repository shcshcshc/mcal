import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/Main";
import { RebornFlame } from "./pages/RebornFlame";
import { Header } from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="reborn_flame" element={<RebornFlame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
