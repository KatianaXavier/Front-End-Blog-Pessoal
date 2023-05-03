import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import './ListaTema.css'
import { Tema } from '../../../models/Tema';
import { getAll } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';

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
            toast.error('É necessário fazer login.', {
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

    return (
        <>
            <Box sx={{ backgroundColor: "#BFC1C0", minHeight: "85vh", padding: "10px" }}>
                {temas.length === 0 && (
                    <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '60vh' }}>
                    <Box sx={{ display: 'flex' }} >
                        <CircularProgress />
                    </Box>
                </Grid>
                )}
                <div className="caixaBotaoNovoTema">
                <Link  to={`/cadastrarTema/`}>
                    <Button className="botaoCadastrarTema"  variant="contained" size="large">
                        Cadastrar tema
                    </Button>
                </Link>
            </div>
                {/* <div className="loaderContainer">
                    <span className="loader"></span>
                </div> */}
                <div className='caixaListaTemas'>
                    {temas.map((tema) => (
                        <Box m={4} style={{ margin: '0', padding: '15px' }}>
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
                </div>
            </Box>
        </>
    );
}

export default ListaTema;
