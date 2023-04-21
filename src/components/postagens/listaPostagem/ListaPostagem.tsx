import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './ListaPostagens.css'
import { Postagem } from '../../../models/Postagem'
import useLocalStorage from 'react-use-localstorage'
import { Link, useNavigate } from 'react-router-dom'
import { getAll } from '../../../services/Service'

function ListaPostagem() {

    const [temas, setPostagens] = useState<Postagem[]>([])
    const [token, setToken] = useLocalStorage('token')

    const history = useNavigate()

    // função que pega os temas
    async function getAllPostagens() {
        await getAll('/postagens', setPostagens, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllPostagens()
    }, [])

    useEffect(() => {
        if (token === '') {
            alert('É necessário estar logado.')
            history('/login')
        }
    }, [])

    return (
        <>
            {temas.map((postagem) => (
                <Box className='caixaListaPostagens'>
                    <Box m={4}>
                        <Card >
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>
                                    {postagem.titulo}
                                </Typography>
                                <Typography variant='h5' component='h2' gutterBottom>
                                    {postagem.texto}
                                </Typography>
                                <Typography gutterBottom component='p'>
                                    {postagem.tema?.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/atualizarPostagem/${postagem.id}`}>
                                    <Button color='primary' variant="contained" size="small">
                                        Atualizar
                                    </Button>
                                </Link>
                                <Link to={`/deletarPostagem/${postagem.id}`}>
                                    <Button color='secondary' variant="contained" size="small">
                                        Deletar
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default ListaPostagem