import { Button, TextField, Container, Typography, Box, InputLabel, Select, MenuItem, FormControl, Paper, Grid, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

export default function FormularioPrato() {
    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tagSelecionada, setTagSelecionada] = useState<ITag | undefined>();
    const [resturanteSelecionado, setRestauranteSelecionado] = useState<IRestaurante | undefined>();
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);


    let prato: IPrato | undefined;

    const parametros = useParams();

    function aoSubmeterForm(evento?: React.FormEvent<HTMLFormElement>) {
        console.log(parametros.id)
        evento?.preventDefault();
        if (!nomePrato) return;
        if (parametros.id) {
            http.put(`pratos/${parametros.id}/`, {
                nome: nomePrato
            }).finally(() => {
                alert('Prato atualizado com sucesso');
            })
        }
        else {
            http.post('pratos/', {
                nome: nomePrato
            }).finally(() => {
                setNomePrato('');
            })
            evento?.preventDefault();
            console.log('Nome prato', nomePrato);
        }
        return null;
    }

    function onSelecionaTag(id: number) {
        if (tags.length == 0) return;
        setTagSelecionada(tags.find((t) => t.id === id));
    }

    function onSelecionaRestaurante(idRestaurante: number) {
        if (restaurantes.length == 0) return;
        setRestauranteSelecionado(restaurantes.find((r) => r.id === idRestaurante));
    }

    useEffect(() => {
        if (parametros && parametros['id']) {
            http.get<IPrato>(`pratos/${parametros['id']}/`).then((result) => {
                prato = result.data;
                setNomePrato(result.data.nome);
            });
            console.log(parametros);
        }
    }, [parametros])

    useEffect(() => {
        http.get<IRestaurante[]>(`restaurantes/`).then((result) => {
            setRestaurantes(result.data);
        });
        http.get(`tags/`).then((result) => {
            console.log(typeof result.data);

            //setTags(result.data.tags);
            console.log(tags);
        });
    }, []);

    return (
        <>
            <Box  >
                <Container maxWidth='lg' sx={{ mt: 1 }} >
                    <Paper sx={{ padding: 2 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }} >
                            <Typography component='h1' variant='h6' >Formulário de pratos</Typography>
                            <Box sx={{ width: '100%' }} component='form' onSubmit={() => aoSubmeterForm()} >
                                <Grid container spacing={2} rowSpacing={2} >
                                    <Grid item xs={4}>
                                        <TextField
                                            value={nomePrato}
                                            onChange={(event) => setNomePrato(event.target.value)}
                                            label="Nome do Prato"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4} >
                                        <FormControl fullWidth >
                                            <InputLabel id="label-select-tags">{tags.length > 0 ? 'Tag do prato' : 'Carregando tags...'}</InputLabel>
                                            <Select
                                                labelId="label-select-tags"
                                                id="select-label"
                                                value={tagSelecionada}
                                                label="Ordenador"
                                                disabled={tags.length <= 0}
                                                onChange={(event: SelectChangeEvent<any>) => onSelecionaTag(event.target.value)}
                                            >
                                                {tags.length > 0 && tags.map((t) => <MenuItem value={t.id}>{t.value}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}  >
                                        <FormControl fullWidth >
                                            <InputLabel id="label-select-restaurantes">{restaurantes.length > 0 ? "Restaurante do prato" : "Carregando restaurantes..."}</InputLabel>
                                            <Select
                                                labelId="label-select-restaurantes"
                                                id="select-restaurantes"
                                                value={resturanteSelecionado?.id}
                                                label={restaurantes.length > 0 ? "Restaurante" : "Carregando restaurantes"}
                                                disabled={restaurantes.length <= 0}
                                                onChange={(event: SelectChangeEvent<any>) => onSelecionaRestaurante(event.target.value)}
                                            >
                                                {restaurantes.length > 0 && restaurantes.map((r) => <MenuItem value={r.id}>{r.nome}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Descrição do prato"
                                            fullWidth
                                            multiline
                                            maxRows={4}
                                            value={descricaoPrato}
                                            onChange={(evento) => setDescricaoPrato(evento?.target.value)}
                                        />
                                    </Grid>
                                    <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="contained">Salvar</Button>
                                </Grid>
                            </Box >
                        </Box>
                    </Paper>
                </Container>
            </Box>

        </>
    );
}
