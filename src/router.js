import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contacts from './components/Contacts';
import Problems from './components/Problems/Problems';
import Problem from './components/Problem/Problem';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

import PrivateRoute from './components/helpers/PrivateRoute';
import AuthProvider from './hooks/AuthProvider';

const AppRouter = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="problems" element={<Problems />} />
            <Route path="problems/:id" element={<Problem />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default AppRouter;
