import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import "./Login.css";
import UserLogin from "../../models/UserLogin";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";

function Login() {

    const history = useNavigate();

    const dispatch = useDispatch();

    const [token, setToken] = useState("");

    const [isLoading, setIsLoading] = useState(false) 

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        foto: "",
        senha: "",
        token: "",
    });

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
        });
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setIsLoading(true)
            await login("/usuarios/logar", userLogin, setToken);
            alert("Usuário logado com sucesso!");
        } catch (error) {
            setIsLoading(false)
            alert("Dados inconsistentes; erro ao logar.");
        }
    }

    useEffect(() => {
        if (token !== "") {
            dispatch(addToken(token));
            history("/home");
        }
    }, [token]);

    return (
        <>
            <Grid className="caixaLogin" container alignItems={"center"}>
                <Grid item xs={6} justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Grid item xs={6}>
                            <form onSubmit={onSubmit}>
                                <Typography variant="h3" className="textos" gutterBottom fontWeight='bold'>
                                    Entrar
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    name="usuario"
                                    value={userLogin.usuario}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        updatedModel(event)
                                    }
                                    label="Usuário"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    error={userLogin.senha.length < 8 && userLogin.senha.length > 0}
                                    helperText={userLogin.senha.length < 8 && userLogin.senha.length > 0 ? 'Senha incorreta' : ''}              
                                    variant="outlined"
                                    name="senha"
                                    value={userLogin.senha}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        updatedModel(event)
                                    }
                                    label="Senha"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                />
                                <Box marginY={2}>
                                    <Button
                                        disabled={isLoading}
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        fullWidth
                                    >
                                        {isLoading ? (<span className="loaderLogin"></span>) : ('Entrar')}
                                    </Button>
                                </Box>
                            </form>
                            <hr />
                            <Box marginTop={2}></Box>
                            <Typography variant="subtitle1" align="center">
                                Ainda não tem uma conta?
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom className="textos">
                                <Link to="/cadastro">Cadastre-se aqui!</Link>
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
