import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contacts from './components/Contacts';
import Problems from './components/Problems/Problems';
import Problem from './components/Problem/Problem';
import Attempts from './components/Problem/Attempts';
import Attempt from './components/Problem/Attempt';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Organizations from './components/Organisations';
import Organization from './components/Organization/Organization';
import Contests from './components/Conests';
import Contest from './components/Contest/Contest';
import ContestResults from './components/Contest/СontestResults';

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
            <Route path="problems/:problem_id" element={<Problem />} />
            <Route path="problems/:problem_id/attempts" element={<Attempts />} />
            <Route path="problems/:problem_id/attempts/:attempt_id" element={<Attempt />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="organizations/:organization_id" element={<Organization />} />
            <Route path="contests" element={<Contests />} />
            <Route path="contests/:contest_id" element={<Contest />} />
            <Route path="contests/:contest_id/results" element={<ContestResults />} />
            <Route path="contests/:contest_id/problems/:problem_id" element={<Problem />} />
            <Route path="contests/:contest_id/problems/:problem_id/attempts" element={<Attempts />} />
            <Route path="contests/:contest_id/problems/:problem_id/attempts/:attempt_id" element={<Attempt />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default AppRouter;
