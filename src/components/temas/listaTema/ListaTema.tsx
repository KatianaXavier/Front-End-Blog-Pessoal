import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import './ListaTemas.css'
import { Tema } from '../../../models/Tema';
import { getAll } from '../../../services/Service';
import useLocalStorage from 'react-use-localstorage';

function ListaTema() {

    // criação da variável com useState
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token')
    const history = useNavigate()

    // função que pega os temas
    async function getAllTemas() {
        await getAll('/temas', setTemas, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllTemas()
    }, [])

    useEffect(() => {
        if (token === '') {
            alert('É necessário estar logado.')
            history('/login')
        }
    }, [])

    return (
        <>
            {temas.map((tema) => (
                <Box className='caixaListaTemas'>
                    <Box m={4}>
                        <Card>
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>Tema:</Typography>
                                <Typography variant="h5" component='h2'>{tema.descricao}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={'/atualizarTema/${tema.id}'}>
                                    <Button variant="contained" size="small" color='primary'>
                                        Atualizar
                                    </Button>
                                </Link>
                                <Link to={'/deletarTema/${tema.id}'}>
                                    <Button variant="contained" size="small" color="secondary">
                                        Deletar
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            ))}
        </>
    );
}

export default ListaTema;
