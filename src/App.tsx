import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material'
import Navbar from './components/statics/navbar/Navbar'
import Home from './blogPages/home/Home.jsx'
import Footer from './components/statics/footer/Footer'
import Login from './blogPages/login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
