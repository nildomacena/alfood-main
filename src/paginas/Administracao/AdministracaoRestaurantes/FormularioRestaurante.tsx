import { Button, TextField, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    let restaurante: IRestaurante | undefined;

    const parametros = useParams();

    function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
        console.log(parametros.id)
        evento.preventDefault();
        if (!nomeRestaurante) return;
        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).finally(() => {
                alert('Restaurante atualizado com sucesso');
            })
        }
        else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            }).finally(() => {
                setNomeRestaurante('');
            })
            evento.preventDefault();
            console.log('Nome restaurante', nomeRestaurante);
        }
        return null;
    }

    useEffect(() => {
        if (parametros && parametros['id']) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros['id']}/`).then((result) => {
                restaurante = result.data;
                setNomeRestaurante(result.data.nome);
            });
            console.log(parametros);
        }
    }, [parametros])
    return (
        <Container >
            <form onSubmit={(event) => aoSubmeterForm(event)} >
                <TextField
                    value={nomeRestaurante}
                    onChange={(event) => setNomeRestaurante(event.target.value)}
                    label="Nome do Restaurante"
                    variant="outlined" />
                <Button type="submit" variant="contained">Salvar</Button>
            </form>
        </Container>
    );
}