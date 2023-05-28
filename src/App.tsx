import React from "react";
import "./assets/css/reset.css";
import "./assets/css/styles.css";
import "react-quill/dist/quill.snow.css";
import Header from "./components/Header";
import GnuIndex from "./components/GnuIndex";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div id="app">
      <Header />
      <GnuIndex />
      <Schedule />
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
