import "./Home.css";
import React, { useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import TabPostagens from "../../components/postagens/tabPostagem/TabPostagem";
import ListaPostagem from "../../components/postagens/listaPostagem/ListaPostagem";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { Link, useNavigate } from "react-router-dom";

function Home() {

  const history = useNavigate()

  function postar() {
    history('/cadastroPostagem')
  }

  // const dispatch = useDispatch();

  // const history = useNavigate();

  // const token = useSelector<TokenState, TokenState["token"]>(
  //   (state) => state.token
  // )

  // useEffect(() => {
  //   if (token === "") {
  //     toast.error('É necessário fazer login.', {
  //       position: "top-right",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       });
  //     history("/login")
  //   }
  // }, [token])

  return (
    <>
      <Grid
        className="caixaHome"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="titulos"
            >
              Seja bem vinde!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className="titulos"
            >
              Expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1} display={'flex'} flexDirection={'column'} gap={1}></Box>
            <Link to="/postagens">
              <Button
                className="botaoVerPostagens"
                variant="outlined">
                Ver postagens
              </Button>
            </Link>
            <Box marginLeft={1}>
              <ModalPostagem />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            className="imagemHome"
            src="/src/assets/images/imagemHome.svg"
            alt="Mãos sobre o teclado de um laptop, com um caderno e lápis do lado direito e uma planta na parte superior esquerda"
          />
        </Grid>
        <Grid xs={12} className="caixaPostagens">
          <TabPostagens />
        </Grid>
      </Grid >
    </>
  );
}


export default Home;
