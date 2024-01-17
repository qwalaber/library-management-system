import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BooksPage from './components/BooksPage';
import ManagePage from './components/ManagePage';
import UserPage from "./components/UserPage";
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

function App() {
  return (
  <Router>
    <AuthProvider>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/books" element={<BooksPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/manage" element={<ManagePage/>}/>
        <Route path="/profile" element={<UserPage/>}/>
      </Routes>
      <Footer/>
    </AuthProvider>
  </Router>
  );
}

export default App;
