import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to ={isAuthenticated ? '/dashboard' : '/login'} replace />}
      />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route 
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
        } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;
