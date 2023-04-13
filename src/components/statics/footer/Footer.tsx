import React from "react";
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
          <Box style={{ backgroundColor: "#262729", height: "95px" }}>
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
                style={{ color: "#0CABF7", fontFamily: 'Play' }}
              >
                Siga-nos nas redes sociais{" "}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a
                href="https://github.com/KatianaXavier/"
                target="_blank"
              >
                <GitHubIcon style={{ fontSize: 30, color: "white" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/katianaxavier/"
                target="_blank"
              >
                <LinkedInIcon style={{ fontSize: 30, color: "white" }} />
              </a>
            </Box>
          </Box>
          <Box style={{ backgroundColor: "#565159", height: "60px" }}>
            <Box paddingTop={1}>
              <Typography
                variant="subtitle2"
                align="center"
                gutterBottom
                style={{ color: "white", fontFamily: 'Play' }}
              >
                © 2023 Copyright
              </Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://github.com/Katianaxavier" >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ color: "white", fontFamily: 'Play' }}
                  align="center"
                >
                  Feito com 💛 por <a target="_blank" href="https://github.com/Katianaxavier" style={{ color:"white" }}>Katiana Xavier</a>
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
