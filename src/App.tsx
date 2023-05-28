import React from "react";
import "./assets/css/reset.css";
import "./assets/css/styles.css";
import "react-quill/dist/quill.snow.css";
import Header from "./components/Header";
import GnuIndex from "./components/GnuIndex";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="app">
      <Header />
      <GnuIndex />
      <Schedule />
      <Footer />
    </div>
  );
}

export default App;
