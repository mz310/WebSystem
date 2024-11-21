// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserPlaces from './components/UserPlaces';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPlace from './components/AddPlace';
import EditPlace from './components/EditPlace';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-places/:uid" element={<UserPlaces />} />
            <Route path="/add-place" element={<AddPlace />} />
            <Route path="/edit-place/:userId/:placeId" element={<EditPlace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
