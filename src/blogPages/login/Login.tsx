import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid item xs={6} justifyContent="center">
                    <Box display='flex' justifyContent="center">
                        <form>
                            <Typography>Entrar</Typography>
                            <TextField variant='outlined'label='Usuário' fullWidth></TextField>
                            <TextField variant='outlined'label='Senha' fullWidth></TextField>
                            <Link to='/home'>
                                <Button variant='outlined'color="primary">Logar</Button>
                            </Link>
                        </form>
                    </Box>
                </Grid>
                <Grid xs={6} className='imagemLogin'></Grid>
            </Grid>
        </>

    ) 
}

export default Login;
