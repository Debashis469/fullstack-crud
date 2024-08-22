import React, { useContext } from 'react'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './pages/Home'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
  const { user } = useContext(AuthContext)  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login" /> } />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" /> } />
        <Route path='/login' element = { !user ? <Login /> : <Navigate to="/" /> }/>
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App