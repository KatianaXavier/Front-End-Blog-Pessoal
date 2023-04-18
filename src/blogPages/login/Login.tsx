import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, {ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { login } from "../../services/Service";
import "./Login.css";
import UserLogin from "../../models/UserLogin";

function Login() {

    const history = useNavigate()

    const [token, setToken] = useLocalStorage('token')

    const [userLogin, setUserLogin] = useState<UserLogin> (
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: '',
            token: ''
        }
    )

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ... userLogin,
            [event.target.name]: event.target.value
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await login('/usuarios/logar', userLogin, setToken)
            alert('Usuário logado com sucesso!')
        } catch (error) {
            alert('Dados inconsistentes; erro ao logar.')
        }
    }

    useEffect(() => {
        if(token != '') {
            history('/home')
        }
    }, [token])

    return (
        <>
            <Grid className="caixaLogin" container alignItems={"center"}>
                <Grid item xs={6} justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Grid item xs={6}>
                            <form onSubmit={onSubmit}>
                                <Typography
                                    variant="h4"
                                    className="textos"
                                    gutterBottom
                                >
                                    Entrar
                                </Typography>
                                <TextField value={userLogin.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                    variant="outlined"
                                    label="Usuário"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField value={userLogin.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                    variant="outlined"
                                    label="Senha"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                />
                                <Box marginY={2}>
                                        <Button
                                            type="submit"
                                            size="large"
                                            variant="contained"
                                            fullWidth
                                        >
                                            Entrar
                                        </Button>
                                </Box>
                            </form>
                            <hr />
                            <Box marginTop={2}></Box>
                            <Typography variant="subtitle1" align="center">
                                Ainda não tem uma conta?
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom className="textos"
                            ><Link to='/cadastrousuario'>Cadastre-se aqui!</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={6} className="imagemLogin"></Grid>
            </Grid>
        </>
    );
}

export default Login;
