import React from "react";
import "./App.css";
import "./components/navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./Pages/main";
import { Login } from "./Pages/login";
import { CreatePost } from "./Pages/create-post/createPost";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
