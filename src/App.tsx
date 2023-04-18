import './App.css'
import Navbar from './components/statics/navbar/Navbar'
import Home from './blogPages/home/Home.jsx'
import Footer from './components/statics/footer/Footer'
import Login from './blogPages/login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CadastroUsuario from './blogPages/cadastroUsuario/CadastroUsuario'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastroUsuario' element={<CadastroUsuario />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
