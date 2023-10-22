import './App.css';
import Movies from './components/movie';
import {Routes, Route, BrowserRouter, Navigate, useNavigate} from "react-router-dom"
import jwtDecode from "jwt-decode"
import Rental from './components/rental';
import Customer from './components/customer';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';
import NotFound from './components/common/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Logout from './components/logout';
import  Profile  from './components/profile';
import {getCurrentUser} from "./services/authService"

function App() {
  const [user,setUser] = useState()
  useEffect(()=>{
    const newUser = getCurrentUser()
    setUser(newUser)
  },[])
  return (
    <BrowserRouter>
    <ToastContainer />
    <NavBar user={user}/>
      <div className='content'>
        <Routes>
          <Route path="/not-found" element={<NotFound/>}/>
          <Route path="*" element={<Navigate replace to="/not-found"/>}/>
          <Route path="/login" element={!user ? <LoginForm/> : <Navigate from="/login" replace to="/movies"/>}/>
          <Route path="/register" element={!user ? <RegisterForm/> : <Navigate from="/register" replace to="/movies"/>}/>
          <Route path="/profile" element={user ? <Profile user={user}/> : <Navigate from="/profile" replace to="/login"/>}/>
          <Route path="/logout" element={user ? <Logout/> : <Navigate from="/logout" replace to="/login"/>}/>
          <Route path="/movies/:id" element={<MovieForm/>}/>
          <Route path="/movies" element={ <Movies user={user}/>}/>
          <Route path="/rentals" element={<Rental />}/>
          <Route path="/customers" element={<Customer />}/>
          <Route path="/" element={<Navigate from="/" replace to="/movies"/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
