import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { Tema } from '../../../models/Tema'
import { post, put } from '../../../services/Service'

function CadastroTema() {

    const { id } = useParams<{id: string}>()
    const history = useNavigate()
    const [token, setToken] = useLocalStorage('token')

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

    useEffect(() => {
        if (token === '') {
            alert('É necessário fazer login.')
            history('/login')
        }
    }, [])

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if(id !== '') {
            await put('/temas', tema, setTema, {
                headers: {
                    Authorization: token
                }
            })
            alert('Tema atualizado com sucesso.')
        } else {
            await post('/temas', tema, setTema, {
                headers: {
                    Authorization: token
                }
            })
            alert('Tema cadastrado com sucesso.')
        }
        back()
        
    }

    function back() {
        history('/temas')
    }

    useEffect(() => {
        if(tema.id !== 0) {
            history('/temas')
        }
    }, [tema.id])

    return (
        <>
            <h2>Cadastrar tema</h2>
            <form onSubmit={onSubmit}>
                <TextField
                    label='Descrição do tema'
                    name='descricao' 
                    value={tema.descricao}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                />
                <Button type='submit' variant='contained'>Cadastrar tema</Button>
            </form>
        </>
    )
}

export default CadastroTema