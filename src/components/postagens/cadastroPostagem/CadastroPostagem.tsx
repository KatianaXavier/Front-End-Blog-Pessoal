import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Button,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Grid,
} from '@mui/material';
import { Postagem } from '../../../models/Postagem';
import { useNavigate, useParams } from 'react-router-dom';
import { Tema } from '../../../models/Tema';
import { getAll, getById, put, post } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { User } from '../../../models/User';
import { toast } from 'react-toastify';
import './CadastroPostagem.css'

function CadastroPostagem() {

    const history = useNavigate()

    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )

    const userId = useSelector<TokenState, TokenState["id"]>(
        (state) => state.id
    )

    const { id } = useParams<{ id: string }>()

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null
    })

    const [usuario, setUsuario] = useState<User>({
        id: +userId,
        nome: '',
        usuario: '',
        foto: '',
        senha: ''
    })

    useEffect(() => {
        if (token === '') {
            toast.error('É necessário fazer login', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            history('/login')
        }
    }, [token])

    function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    async function getAllTemas() {
        await getAll("/temas", setTemas, {
            headers: {
                Authorization: token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await getById(`postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario
        })
    }, [tema])

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if (id !== undefined) {
            try {
                await put('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toast.success('Postagem atualizada com sucesso.', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                history('/postagens')
            } catch (error) {
                toast.error('Falha ao atualizar a postagem.', {
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
            try {
                await post('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toast.success('Postagem cadastrada com sucesso.', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                history('/postagens')
            } catch (error) {
                toast.error('Falha ao cadastrar a postagem.', {
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
        }
    }

    return (
        <>
            <Grid container justifyContent={'center'} mt={4}>
                <form className="cadastroPostagem" onSubmit={onSubmit}>
                    <Typography marginTop={4} variant="h3" align="center" gutterBottom>
                        {postagem.id !== 0 ? "Atualizar postagem" : "Cadastrar postagem"}
                    </Typography>
                    <TextField
                        value={postagem.titulo}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)}
                        id="titulo"
                        label="Título da postagem"
                        variant="outlined"
                        name="titulo"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        value={postagem.texto}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)}
                        id="texto"
                        error={postagem.texto.length > 700}
                        label={postagem.texto.length > 700 
                                ? "A postagem deve ter até 700 caracteres" 
                                : "Conteúdo da postagem"}
                        name="texto"
                        variant="outlined"
                        multiline
                        margin="normal"
                        minRows={5}
                        fullWidth
                    />
                    <FormControl margin='normal'>
                        <InputLabel>Tema</InputLabel>
                        <br />
                        <Select
                            variant='standard'
                            onChange={(event) => getById(`/temas/${event.target.value}`, setTema, {
                                headers: {
                                    Authorization: token
                                }
                            })}
                        >
                            {
                                temas.map((tema) => (
                                    <MenuItem style={{display: 'block'}} value={tema.id}>{tema.descricao}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={tema.id === 0 || postagem.texto.length > 700}
                    >
                        {tema.id === 0
                            ? 'Selecione um tema'
                            : id === undefined
                            ? 'Postar'
                            : 'Atualizar postagem'
                        }
                        <br />
                    </Button>
                </form>
            </Grid >
        </>
    )
}

export default CadastroPostagem