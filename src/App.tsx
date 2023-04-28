import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./components/statics/navbar/Navbar";
import Home from "./blogPages/home/Home";
import Footer from "./components/statics/footer/Footer";
import Login from "./blogPages/login/Login";
import CadastroUsuario from "./blogPages/cadastroUsuario/CadastroUsuario";
import ListaTemas from "./components/temas/listaTema/ListaTema";
import ListaPostagens from "./components/postagens/listaPostagem/ListaPostagem";
import CadastroPostagem from "./components/postagens/cadastroPostagem/CadastroPostagem";
import DeletarPostagem from "./components/postagens/deletaPostagem/DeletarPostagem";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarTema from "./components/temas/deletaTema/DeletarTema";
import { Provider } from "react-redux";
import store from './store/store';
import Perfil from "./components/perfil/Perfil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: "85vh" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="/temas" element={<ListaTemas />} />
            <Route path="/postagens" element={<ListaPostagens />} />
            <Route path="/cadastrarTema" element={<CadastroTema />} />
            <Route path="/atualizarTema/:id" element={<CadastroTema />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
            <Route path="/cadastrarPostagem" element={<CadastroPostagem />} />
            <Route path="/atualizarPostagem/:id" element={<CadastroPostagem />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
