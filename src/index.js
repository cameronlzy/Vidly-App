import React from 'react';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css"
import 'react-toastify/dist/ReactToastify.css'
import App from './App';
const domNode = document.getElementById('root')
const root = createRoot(domNode)

console.log(process.env.REACT_APP_NAME)

root.render(<App />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
