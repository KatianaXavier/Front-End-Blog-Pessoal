import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom'
import { Postagem } from '../../../models/Postagem'
import { Tema } from '../../../models/Tema'
import { getAll, getById, post, put } from '../../../services/Service'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addToken } from '../../../store/tokens/actions'

function CadastroPostagem() {

    const dispatch = useDispatch();
    const history = useNavigate()
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
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
    })

    useEffect(() => {
        if (token === '') {
            dispatch(addToken(token))
            alert('É necessário fazer login.')
            history('/login')
        }
    }, [token])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getAllTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

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

    function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    function back() {
        history('/postagens')
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if (id !== undefined) {
            try {
                await put('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Postagem atualizada com sucesso.');
                history('/postagens')
            } catch (error) {
                alert('Falha ao atualizar a postagem.');
            }
        } else {
            try {
                await post('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Postagem cadastrada com sucesso.');
                history('/postagens')
            } catch (error) {
                alert('Falha ao cadastrar a postagem.');
            }
            back()
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <form onSubmit={onSubmit} >
                    <Typography variant="h4" align="center">
                        {postagem.id == 0 ? "Cadastre" : "Atualize"} sua postagem
                    </Typography>
                    <TextField
                        value={postagem.titulo}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)}
                        id="titulo"
                        label="Título"
                        variant="outlined"
                        name="titulo"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        value={postagem.texto}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)}
                        id="texto"
                        label="Conteúdo da postagem"
                        name="texto"
                        variant="outlined"
                        multiline
                        minRows={5}
                        fullWidth
                    />
                    <FormControl>
                        <InputLabel>Tema</InputLabel>
                        <Select
                            variant="standard"
                            onChange={(event) => getById(`/temas/${event.target.value}`, setTema, {
                                headers: {
                                    'Authorization': token
                                }
                            })}>
                            {
                                temas.map((tema) => (
                                    <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" disabled={tema.id === 0}>
                        {tema.id === 0 ? 'selecione um tema' : 'postar'}
                    </Button>

                </form>
            </Container >
        </>
    )
}

export default CadastroPostagem