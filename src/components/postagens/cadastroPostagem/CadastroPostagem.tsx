import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { Postagem } from '../../../models/Postagem'
import { Tema } from '../../../models/Tema'
import { getAll, getById, post, put } from '../../../services/Service'

function CadastroPostagem() {

    const { id } = useParams<{id: string}>()
    const history = useNavigate()
    const [token, setToken] = useLocalStorage('token')
    const [temas, setTemas] = useState<Tema[]>([])

    useEffect(() => {
        if (token === '') {
            alert('É necessário fazer login.')
            history('/login')
        }
    }, [])

    const [tema, setTema] = useState<Tema> (
        {
            id: 0,
            descricao: ''
        })

    const [postagem, setPostagem] = useState<Postagem> ({
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await getAll("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await getById('postagens/${id}', setPostagem, {
            headers: {
                'Authorization': token
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

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if (id !== undefined) {
            put('/postagens', postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem atualizada com sucesso.');
        } else {
            post('/postagens', postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem cadastrada com sucesso.');
        }
        back()
    }

    function back() {
        history('/postagens')
    }

    return (
        <Container maxWidth="sm">
            <form >
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper">
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPostagem;

// 9:00