import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import "./Login.css";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";
import UserLogin from "../../models/UserLogin";

function Login() {

    const history = useNavigate()

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: ''
    });

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: ''
    })

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        });
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            setIsLoading(true)
            await login('/usuarios/logar', userLogin, setRespUserLogin)
            toast.success('Login feito com sucesso. 🥳', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error('Erro ao logar.', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }
    }

    useEffect(() => {
        if (respUserLogin.token !== '') {
            console.log(respUserLogin)
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))
            history('/home')
        }
    }, [respUserLogin.token])

    return (
        <>
            <Grid className="caixaLogin" container alignItems={"center"}>
                <Grid item xs={6} justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Grid item xs={6}>
                            <form onSubmit={onSubmit}>
                                <Typography variant="h3" className="textos" gutterBottom>
                                    Entrar
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    name="usuario"
                                    value={userLogin.usuario}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                    label="E-mail"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    error={userLogin.senha.length < 8 && userLogin.senha.length > 0}
                                    helperText={userLogin.senha.length < 8 && userLogin.senha.length > 0 ? 'A senha deve ter mais de 8 caracteres' : ''}
                                    variant="outlined"
                                    name="senha"
                                    value={userLogin.senha}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                    label="Senha"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                />
                                <Box marginY={2}>
                                    <Button className="loaderLogin"
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
                <Grid item xs={6}></Grid>
            </Grid>
        </>
    )
}

export default Login
