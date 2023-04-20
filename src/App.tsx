import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/statics/navbar/Navbar'
import Home from './blogPages/home/Home'
import Footer from './components/statics/footer/Footer'
import Login from './blogPages/login/Login'
import CadastroUsuario from './blogPages/cadastroUsuario/CadastroUsuario'
import ListaTemas from './components/temas/listaTemas/ListaTemas'
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens'
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarTema from './components/temas/deletaTema/DeletarTema';
import DeletarPostagem from './components/postagens/deletaPostagem/DeletarPostagem';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '85vh' }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastro' element={<CadastroUsuario />} />
          <Route path='/temas' element={<ListaTemas />} />
          <Route path='/postagens' element={<ListaPostagens />} />
          <Route path='/cadastrarTema' element={<CadastroTema />} />
          <Route path='/atualizarTema/:id' element={<CadastroTema />} />
          <Route path='/deletarTema' element={<DeletarTema />} />
          <Route path='/cadastrarPostagem' element={<CadastroTema />} />
          <Route path='/atualizarPostagem/:id' element={<CadastroTema />} />
          <Route path='/deletarPostagem' element={<DeletarPostagem />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
