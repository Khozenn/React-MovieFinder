import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Series from "./pages/Series";
import Item from "./pages/Item";
import ScrollToTop from "./components/ScrollToTop";
import People from "./pages/People";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films type={"movie"} />} />
        <Route path="/series" element={<Series type={"tv"} />} />
        <Route path="/:type/:id" element={<Item />} />
        <Route path="/people/:id" element={<People />} />
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);
