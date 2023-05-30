import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Layout</h1>}>
          <Route path="/" element={<h2>main</h2>}>
            test
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
