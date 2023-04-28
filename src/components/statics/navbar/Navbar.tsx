import React from "react";
import "./Navbar.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../../store/tokens/actions";
import { toast } from "react-toastify";

function Navbar() {

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  )

  const history = useNavigate()

  const dispatch = useDispatch()

  // função que faz o logout, limpando o token
  function goLogout() {
    dispatch(addToken(''))
    toast.info('Usuário deslogado!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    history('/login')
  }

  var navbarComponent

  if (token !== '') {
    navbarComponent =
      <AppBar position="static">
        <Toolbar variant="dense" className="navbar">
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Link to='/home'>
              <Box className="blogPessoalNavbar">
                <Typography variant="h5">
                  Blog Pessoal
                </Typography>
              </Box>
            </Link>
            <Box display="flex" justifyContent="start">
              <Link to='/home'>
                <Box mx={1} className="cursor">
                  <Typography variant="h6" className="textosNavbar">
                    Home
                  </Typography>
                </Box>
              </Link>
              <Box mx={1} className="cursor">
                <Link to='/postagens'>
                  <Typography variant="h6" className="textosNavbar">
                    Postagens
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="cursor">
                <Link to='/cadastrarPostagem'>
                  <Typography variant="h6" className="textosNavbar">
                    Cadastrar postagem
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="cursor">
                <Link to='/temas'>
                  <Typography variant="h6" className="textosNavbar">
                    Temas
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="cursor">
                <Link to='/cadastrarTema'>
                  <Typography variant="h6" className="textosNavbar">
                    Cadastrar Tema
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="cursor" onClick={goLogout}>
                <Typography variant="h6" color="inherit">
                  Logout
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar;
