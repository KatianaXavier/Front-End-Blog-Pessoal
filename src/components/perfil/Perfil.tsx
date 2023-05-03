import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenState } from '../../store/tokens/tokensReducer'
import { getById, post } from '../../services/Service';
import { User } from '../../models/User'
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material'

function Perfil() {

    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );

    const [usuario, setUsuario] = useState<User>({
        id: +userId,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
    })

    async function getUserById(id: number) {
        await getById(`/usuarios/${id}`, setUsuario, {
            headers: { Authorization: token }
        })
    }

    useEffect(() => {
        getUserById(+userId)
    }, [])

    return (
        <>
            <Container>
                <Grid container marginTop={5}>
                    <Grid xs={3} alignItems={'center'} justifyContent={'center'}>
                        <Avatar src={usuario.foto} alt='' style={{ width: '15rem', height: '15rem', margin: '0 auto' }} />
                        <Typography variant='h5' align='center' >{usuario.nome}</Typography>
                    </Grid>
                    <Grid xs={6} justifyContent={'center'}>
                        <Typography variant='h4' align='center' style={{ paddingBottom: '4vh' }}>Postagens de {usuario.nome}</Typography>
                        <Typography variant='h6' style={{ paddingBottom: '2vh' }}>Você tem {usuario.postagem?.length} postagens cadastradas.</Typography>
                        {usuario.postagem?.map((post) => (
                            <Typography style={{ color: '#0CABF7', fontWeight:'bold', justifyContent: 'center', paddingBottom: '1vh' }}>{post.titulo}</Typography>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Perfil