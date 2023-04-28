import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Tema } from '../../../models/Tema';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteById, getById } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarTema() {

    const history = useNavigate()

    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )

    const { id } = useParams<{ id: string }>()
    
    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if (token === '') {
            alert('É necessário fazer login.')
            history('/login')
        }
    }, [])

    async function getTemaById(id: string) {
        getById(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            getTemaById(id)
        }
    })

    function sim() {
        deleteById(`/tema/${id}`, {
            headers: {
                Authorization: token
            }
        })
        alert('Tema deletado com sucesso.')
        history('/temas')
    }

    function nao() {
        history('/temas')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography variant='h3' gutterBottom align='center'>Deletar tema</Typography>
                            <Typography variant='body1' gutterBottom align='center'>Você tem certeza de que deseja deletar o tema: <br /> <strong>{tema?.descricao}</strong> </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default DeletarTema;