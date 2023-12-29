import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage';
import ManagePage from './components/ManagePage';
import HistoryPage from "./components/HistoryPage";
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

function App() {
  return (
  <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/books" element={<BrowsePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/users" element={<ManagePage/>}/>
      <Route path="/history" element={<HistoryPage/>}/>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
