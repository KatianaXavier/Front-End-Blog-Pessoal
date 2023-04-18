import './Navbar.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <AppBar position="static" >
        <Toolbar variant="dense" className='navbar'>
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >
            <Box className='blogPessoalNavbar'>
              <Typography variant="h5" color="inherit" >
                Blog Pessoal
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
              <Link to='/home'>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit" >
                  Home
                </Typography>
              </Box>
              </Link>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit" >
                  Postagens
                </Typography>
              </Box>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit" >
                  Temas
                </Typography>
              </Box>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                  Cadastrar Tema
                </Typography>
              </Box>
              <Link to='/login' className='logoutNavbar'>
                <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                  Logout
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;