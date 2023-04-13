import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import "./Home.css";

function Home() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: "#BFC1C0" }}
      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              style={{ color: "#444545", fontWeight: "bold", fontFamily: 'Play' }}
            >
              Seja bem vinde!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              style={{ color: "#444545", fontWeight: "bold", fontFamily: 'Play', }}
            >
              Expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button
              variant="outlined"
              style={{
                borderColor: "white",
                backgroundColor: "#262729",
                color: "#EDB426",
                fontWeight: 500,
                fontFamily: 'Play'
              }}
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
        <Grid xs={12} style={{ backgroundColor: "white" }}></Grid>
      </Grid>
    </>
  );
}

export default Home;