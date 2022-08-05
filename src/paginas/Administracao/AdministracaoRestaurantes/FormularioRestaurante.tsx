import { Button, TextField, Container, Typography, Box, AppBar, Toolbar, Link, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link as RouterLink } from 'react-router-dom';

export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    let restaurante: IRestaurante | undefined;

    const parametros = useParams();

    function aoSubmeterForm(evento?: React.FormEvent<HTMLFormElement>) {
        console.log(parametros.id)
        evento?.preventDefault();
        if (!nomeRestaurante) return;
        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).finally(() => {
                alert('Restaurante atualizado com sucesso');
            })
        }
        else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            }).finally(() => {
                setNomeRestaurante('');
            })
            evento?.preventDefault();
            console.log('Nome restaurante', nomeRestaurante);
        }
        return null;
    }

    useEffect(() => {
        if (parametros && parametros['id']) {
            http.get<IRestaurante>(`restaurantes/${parametros['id']}/`).then((result) => {
                restaurante = result.data;
                setNomeRestaurante(result.data.nome);
            });
            console.log(parametros);
        }
    }, [parametros])
    return (
        <>
           {/*  <AppBar position='static'>
                <Container maxWidth='xl' >
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }} >
                            <Link component={RouterLink} to="/admin/restaurantes" >
                                <Button sx={{ my: 2, color: 'white' }} >Restaurantes</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }} >Novo restaurante</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar> */}
            <Box  >
                <Container maxWidth='lg' sx={{ mt: 1 }} >
                    <Paper sx={{ padding: 2 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }} >
                            <Typography component='h1' variant='h6' >Formulário de restaurantes</Typography>
                            <Box sx={{ width: '100%' }} component='form' onSubmit={() => aoSubmeterForm()} >
                                <TextField
                                    value={nomeRestaurante}
                                    onChange={(event) => setNomeRestaurante(event.target.value)}
                                    label="Nome do Restaurante"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="contained">Salvar</Button>
                            </Box >
                        </Box>
                    </Paper>
                </Container>
            </Box>

        </>
    );
}