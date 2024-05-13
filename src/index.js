import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

const firebaseapp = initializeApp({apiKey: "AIzaSyDGhMpCRK7g2sg3c1T3h4ljIuDKoCSC4YQ",
authDomain: "rova-a8ab1.firebaseapp.com",
projectId: "rova-a8ab1",
storageBucket: "rova-a8ab1.appspot.com",
messagingSenderId: "788700947528",
appId: "1:788700947528:web:c9643b12ff5117b067e47d",
measurementId: "G-LVCLLP6ZZE"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
