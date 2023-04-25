import React from "react";
import './Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Box, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
// footer eheader: # CE796B
// atalho: rfce
function Footer() {

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  )

  var footerComponent

  if (token != '') {
    footerComponent =
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={12}>
          <Box className="caixa1">
            <Box display="flex" alignItems="center" justifyContent="center" paddingTop={2}>
              <a
                href="https://github.com/KatianaXavier/"
                target="_blank"
              >
                <GitHubIcon className="redes" />
              </a>
              <a
                href="https://www.linkedin.com/in/katianaxavier/"
                target="_blank"
              >
                <LinkedInIcon className="redes" />
              </a>
            </Box>
            <Box paddingBottom={1}>
              <a target="_blank" href="https://github.com/Katianaxavier" >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  align="center"
                  className="texto"
                >
                  Feito com 💙 por <a target="_blank" href="https://github.com/Katianaxavier">Katiana Xavier</a>
                </Typography>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
  }

  return (
    <>
      {footerComponent}
    </>
  );
}

export default Footer;
