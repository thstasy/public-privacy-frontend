import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { HashRouter } from 'react-router-dom';
import  {AuthContextProvider} from './components/shared/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  <React.StrictMode>
    <HashRouter>
    <AuthContextProvider>
        <App/>
    </AuthContextProvider>
    </HashRouter>
  </React.StrictMode>
  </>
);

//REMEMBER TO HAVE THE HASH ROUTER OUTSIDE  THE APP(aka, navigator)