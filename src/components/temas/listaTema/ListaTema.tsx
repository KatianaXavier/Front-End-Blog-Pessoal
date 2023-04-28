import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import './ListaTema.css'
import { Tema } from '../../../models/Tema';
import { getAll } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';

function ListaTema() {

    // criação da variável com useState
    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )

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
    }, [temas.length])

    useEffect(() => {
        if (token === '') {
            alert('É necessário estar logado.')
            history('/login')
        }
    }, [token])

    return (
        <>
            {temas.length === 0 && (
                <div className="loaderContainer">
                    <span className="loader"></span>
                </div>
            )}

            <Box className='caixaListaTemas'>
                {temas.map((tema) => (
                    <Box m={4}>
                        <Card variant="outlined" className="cardTema">
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>Tema:</Typography>
                                <Typography variant="h5" component='h2'>{tema.descricao}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/atualizarTema/${tema.id}`}>
                                    <Button variant="contained" size="small" color='primary'>
                                        Atualizar
                                    </Button>
                                </Link>
                                <Link to={`/deletarTema/${tema.id}`}>
                                    <Button variant="contained" size="small" color="secondary">
                                        Deletar
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Box>
                    ))}
                </Box>
        </>
    );
}

export default ListaTema;
