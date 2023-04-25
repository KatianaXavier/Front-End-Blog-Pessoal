import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/statics/navbar/Navbar";
import Home from "./blogPages/home/Home";
import Footer from "./components/statics/footer/Footer";
import Login from "./blogPages/login/Login";
import CadastroUsuario from "./blogPages/cadastroUsuario/CadastroUsuario";
import ListaTemas from "./components/temas/listaTema/ListaTema";
import ListaPostagens from "./components/postagens/listaPostagem/ListaPostagem";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarTema from "./components/temas/deletaTema/DeletarTema";
import DeletarPostagem from "./components/postagens/deletaPostagem/DeletarPostagem";
import { Provider } from "react-redux";
import store from './store/store';
import CadastroPostagem from "./components/postagens/cadastroPostagem/CadastroPostagem";

function App() {
  return (
    <Provider store={store}>
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
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
