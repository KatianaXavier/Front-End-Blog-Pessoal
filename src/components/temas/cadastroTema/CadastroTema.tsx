import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tema } from '../../../models/Tema'
import { getById, post, put } from '../../../services/Service'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addToken } from '../../../store/tokens/actions'

function CadastroTema() {

    const dispatch = useDispatch();
    const history = useNavigate()

    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )

    const { id } = useParams<{ id: string }>()

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [event.target.name]: event.target.value
        })
    }

    async function getTemaById(id: string) {
        await getById(`/temas/${id}`, setTema, {
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

    useEffect(() => {
        if (token === '') {
            dispatch(addToken(token))
            alert('É necessário fazer login.')
            history('/login')
        }
    }, [])

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if (id !== undefined) {
            try {
                await put('/temas', tema, setTema, {
                    headers: {
                        Authorization: token
                    }
                })
                alert('Tema atualizado com sucesso.')
                history('/temas')
            } catch (error) {
                alert('Erro.')
            }
        } else {
            try {
                await post('/temas', tema, setTema, {
                    headers: {
                        Authorization: token
                    },
                })
                alert('Tema cadastrado com sucesso.')
                history('/temas')
            } catch (error) {
                alert('Erro.')
            }
        }
    }

    return (
        <>
            <Grid container justifyContent={'center'} mt={4}>
                <Grid item xs={6}>
                    <Typography
                        align="center"
                        variant="h3"
                        gutterBottom
                        fontWeight={'bold'}
                    >
                        {/* if ternário */}
                        {tema.id !== 0 ? 'Atualizar tema' : 'Cadastrar tema'}
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <Box display="flex" flexDirection={'column'} gap={2}>
                            <TextField
                                label="Descrição do tema"
                                name="descricao"
                                value={tema.descricao}
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    updatedModel(event)
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={tema.descricao.length < 3}
                            >
                                Cadastrar tema
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}

export default CadastroTema