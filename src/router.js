import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

import PrivateRoute from './components/helpers/PrivateRoute';
import AuthProvider from './hooks/AuthProvider';

const AppRouter = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={ <Profile />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default AppRouter;
