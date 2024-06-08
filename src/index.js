import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AppRouter />
);
