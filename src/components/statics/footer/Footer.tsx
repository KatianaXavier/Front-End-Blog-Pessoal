import React from "react";
import './Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Box, Grid, Typography } from "@material-ui/core";
// footer eheader: # CE796B
// atalho: rfce
function Footer() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={12}>
          <Box className="caixa1">
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                className="textoRedes"
              >
                Siga-nos nas redes sociais{" "}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a
                href="https://github.com/KatianaXavier/"
                target="_blank"
              >
                <GitHubIcon className="redes"/>
              </a>
              <a
                href="https://www.linkedin.com/in/katianaxavier/"
                target="_blank"
              >
                <LinkedInIcon className="redes"/>
              </a>
            </Box>
          </Box>
          <Box className="caixa2">
            <Box paddingTop={1}>
              <Typography
                variant="subtitle2"
                align="center"
                gutterBottom
                className="texto"
              >
                © 2023 Copyright
              </Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://github.com/Katianaxavier" >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  align="center"
                  className="texto"
                >
                  Feito com 💛 por <a target="_blank" href="https://github.com/Katianaxavier">Katiana Xavier</a>
                </Typography>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
