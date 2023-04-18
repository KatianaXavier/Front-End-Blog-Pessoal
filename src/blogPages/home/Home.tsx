import React from "react";
import "./Home.css";
import { Box, Button, Grid, Typography } from "@material-ui/core";

function Home() {
  return (
    <>
      <Grid className="caixaHome"
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
          <Box display="flex" justifyContent="center" >
            <Box marginRight={1} ></Box>
            <Button
              className="botaoVerPostagens"
              variant="outlined"
            >
              Ver postagens
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img className="imagem-home"
            src="/src/assets/images/imagemHome.svg"
            alt="Mãos sobre o teclado de um laptop, com um caderno e lápis do lado direito e uma planta na parte superior esquerda"
          />
        </Grid>
        <Grid xs={12} className="caixaPostagens"></Grid>
      </Grid>
    </>
  );
}

export default Home;
