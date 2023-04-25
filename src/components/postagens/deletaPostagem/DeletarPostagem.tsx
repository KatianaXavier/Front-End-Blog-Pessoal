import React, { useEffect, useState } from 'react'
import { Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteById, getById } from '../../../services/Service';
import { Postagem } from '../../../models/Postagem';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../../store/tokens/actions';

function DeletarPostagem() {

    const dispatch = useDispatch();

    const { id } = useParams<{id: string}>()
    const history = useNavigate()
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )
    const [postagem, setPostagem] = useState<Postagem>()

    useEffect(() => {
        if (token === '') {
            dispatch(addToken(token))
            alert('É necessário fazer login.')
            history('/login')
        }
    }, [token])

    useEffect(() => {
        if(id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        getById(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    function sim() {
        history('/postagens')
        deleteById(`/postagem/${id}`, {
            headers: {
                Authorization: token
            }
        })
        alert('Postagem deletada com sucesso.')
    }

    function nao() {
        history('/postagens')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a postagem
                            </Typography>
                            <Typography color="textSecondary" >
                                {postagem?.titulo}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box>
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
export default DeletarPostagem;