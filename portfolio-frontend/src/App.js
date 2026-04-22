import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ViewContacts from "./components/ViewContacts";
function App() {
  return (
    <BrowserRouter>

      <div className="admin-btn">
        <Link to="/admin">Admin</Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </main>
          }
        />

  
  <Route path="/admin" element={<ViewContacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;