import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './ListaPostagem.css'
import { Postagem } from '../../../models/Postagem'
import { Link, useNavigate } from 'react-router-dom'
import { getAll } from '../../../services/Service'
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useDispatch, useSelector } from 'react-redux'
import { addToken } from '../../../store/tokens/actions'

function ListaPostagem() {

    const dispatch = useDispatch();
    
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )

    const [postagens, setPostagens] = useState<Postagem[]>([])

    const history = useNavigate()

    useEffect(() => {
        if (token === '') {
            dispatch(addToken(token))
            alert('É necessário estar logado.')
            history('/login')
        }
    }, [token])

    useEffect(() => {
        getAllPostagens()
    }, [])

    async function getAllPostagens() {
        await getAll('/postagens', setPostagens, {
            headers: {
                Authorization: token
            }
        })
    }

    return (
        <>
            {postagens.map((postagem) => (
                <Box className='caixaListaPostagens'>
                    <Box m={4}>
                        <Card >
                            <CardContent>
                                <Typography variant='h6' color='textSecondary' gutterBottom>
                                    {postagem.titulo}
                                </Typography>
                                <Typography variant='h6' component='h2' gutterBottom>
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