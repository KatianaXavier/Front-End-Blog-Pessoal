import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Grid,
    CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ListaPostagem.css";
import { Postagem } from "../../../models/Postagem";
import { Link, useNavigate } from "react-router-dom";
import { getAll } from "../../../services/Service";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { pink } from "@material-ui/core/colors";

function ListaPostagem() {
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const history = useNavigate();

    useEffect(() => {
        if (token === "") {
            toast.error("É necessário fazer login.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            history("/login");
        }
    }, [token]);

    async function getAllPostagens() {
        await getAll("/postagens", setPostagens, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        getAllPostagens();
    }, [postagens.length]);

    return (
        <>
        <Box sx={{ backgroundColor: "#BFC1C0", minHeight: "85vh", padding: "10px" }}>
            {postagens.length === 0 && (
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
            <div className="caixaBotaoNovaPostagem">
            <Link  to={`/cadastrarPostagem/`}>
                    <Button className="botaoCadastrarPostagem" variant="contained" size="large">
                        Cadastrar postagem
                    </Button>
                </Link>
            </div>
            <div className="caixaListaPostagens">
                {postagens.map((postagem) => (
                    <Box m={4} style={{ margin: "0", padding: "20px" }}>
                        <Card variant="outlined" style={{ padding: "8px" }}>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    {postagem.titulo}
                                </Typography>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {postagem.texto}
                                </Typography>
                                <Typography gutterBottom component="p">
                                    Tema: {postagem.tema?.descricao}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Postado por: {postagem.usuario?.nome}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Data:{" "}
                                    {Intl.DateTimeFormat("pt-BR", {
                                        dateStyle: "full",
                                        timeStyle: "medium",
                                    }).format(new Date(postagem.data))}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/atualizarPostagem/${postagem.id}`}>
                                    <Button color="primary" variant="contained" size="small">
                                        Atualizar
                                    </Button>
                                </Link>
                                <Link to={`/deletarPostagem/${postagem.id}`}>
                                    <Button color="secondary" variant="contained" size="small">
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

export default ListaPostagem;
