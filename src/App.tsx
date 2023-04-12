import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material'
import Navbar from './components/statics/navbar/Navbar'
import Home from './blogPages/home/Home.jsx'
import Footer from './components/statics/footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App
