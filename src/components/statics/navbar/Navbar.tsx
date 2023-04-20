import React from "react";
import "./Navbar.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

function Navbar() {

  const [token, setToken] = useLocalStorage('token')

  const history = useNavigate()

  // função que faz o logout, limpando o token
  function goLogout() {
    setToken('')
    alert('Usuário deslogado.')
    history('/login')
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense" className="navbar">
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>

            <Link to='/home'>
              <Box className="blogPessoalNavbar">
                <Typography variant="h5" color="inherit">
                  Blog Pessoal
                </Typography>
              </Box>
            </Link>
            <Box display="flex" justifyContent="start">
              <Link to='/home'>
                <Box mx={1} className="cursor">
                  <Typography variant="h6" color="inherit">
                    Home
                  </Typography>
                </Box>
              </Link>
              <Box mx={1} className="cursor">
                <Link to='/postagens'>
                  <Typography variant="h6" color="inherit">
                    Postagens
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="cursor">
                <Link to='/temas'>
                  <Typography variant="h6" color="inherit">
                    Temas
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="cursor">
                <Link to='/cadastrarTema'>
                <Typography variant="h6" color="inherit">
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
    </>
  );
}

export default Navbar;
