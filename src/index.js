import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
