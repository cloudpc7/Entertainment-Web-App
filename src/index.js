import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import "../node_modules/bootstrap/scss/bootstrap.scss";
import App from './App';
import MovieProvider  from './providers/MovieProvider';
import AuthProvider from './providers/AuthProvider';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MovieProvider>
          <AuthProvider>
            <App />
          </AuthProvider>          
        </MovieProvider>
      </BrowserRouter>
    </Provider> 
  </React.StrictMode>
);

