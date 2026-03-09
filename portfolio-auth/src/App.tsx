import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { useAuth } from './store/AuthContext';

import Button from './componetns/Button';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import Navbar from './componetns/Navbar';
import UserInfo from './componetns/UserInfo';
import AdminSettings from './pages/AdminSettings';
import AdminUsers from './pages/AdminUsers';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>  
      </Routes>
    </div>
  );
}

export default App
