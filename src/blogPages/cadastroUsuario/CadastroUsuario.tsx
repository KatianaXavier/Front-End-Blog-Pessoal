import React, { ChangeEvent, useEffect, useState } from 'react';
import './CadastroUsuario.css';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { User } from '../../models/User';
import { toast } from 'react-toastify';
import UserLogin from '../../models/UserLogin';

function CadastroUsuario() {

    const history = useNavigate();

    // dados enviados ao backend
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: ''
        })

    // armazena o recebimento dos dados
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: ''
        })

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [isLoading, setIsLoading] = useState(false)

    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(event.target.value)
    }

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if (confirmarSenha === user.senha && user.senha.length > 8) {
            try {
                setIsLoading(true)
                await cadastrarUsuario('/usuarios/cadastrar', user, setUserResult)
                toast.success('Usuário cadastrado com sucesso.', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                history('/home')
            } catch (error) {
                setIsLoading(false)
                toast.error('Por favor, verifique os campos.', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            toast.error('Confira os dados e tente novamente.', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setConfirmarSenha('')
            setUser({
                ...user,
                senha: ''
            })
        }
    }

    // useEffect(() => {
    // }, [user.nome])

    useEffect(() => {
        if (userResult.id !== 0) {
            history('/login')
        }
    }, [userResult])

    function back() {
        history('/login')
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='caixaCadastro'>
            <Grid item xs={6} className='imagemCadastro'></Grid>
            <Grid item xs={6} justifyContent='center' >
                <Box display='flex' justifyContent={'center'} >
                    <Grid item xs={8}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' align='center' gutterBottom fontWeight='bold'>Cadastrar</Typography>
                            <TextField
                                variant='outlined'
                                name='nome'
                                value={user.nome}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                label='Nome'
                                margin='normal'
                                fullWidth />
                            <TextField
                                variant='outlined'
                                name='usuario'
                                value={user.usuario}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                label='E-mail'
                                margin='normal'
                                fullWidth />
                            <TextField
                                variant='outlined'
                                name='foto'
                                value={user.foto}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                label='Foto (URL)'
                                margin='normal'
                                fullWidth />
                            <TextField
                                error={user.senha.length < 8 && user.senha.length > 0}
                                helperText={user.senha.length < 8 && user.senha.length > 0 ? 'A senha deve ter mais de 8 caracteres' : ''}
                                type='password'
                                name='senha'
                                value={user.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                                variant='outlined'
                                label='Senha'
                                margin='normal'
                                fullWidth />
                            <TextField
                                type='password'
                                name='confirmarSenha'
                                value={confirmarSenha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
                                variant='outlined'
                                label='Confirmar senha'
                                margin='normal'
                                fullWidth />
                            <Box marginY={2} display={'flex'} justifyContent={'space-around'} gap={4}>
                                <Link to='/login'>
                                    <Button onClick={back} className='botaoCancelar'
                                        size='large'
                                        variant='contained'
                                        color='error'
                                        fullWidth
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button className="loaderCadastro"
                                    disabled={isLoading}
                                    type='submit'
                                    size='large'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                >
                                    {isLoading ? (<span className="loaderCadastro"></span>) : ('Cadastrar')}
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;
