import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IRestaurante from '../../../interfaces/IRestaurante';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/').then((result) => {
            setRestaurantes(result.data);
        });
    }, []);

    function excluirRestaurante(restaurante: IRestaurante) {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restaurante.id}/`).then((_) => {
            axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/').then((result) => {
                setRestaurantes(result.data);
                alert(`Restaurante ${restaurante.nome} excluído com sucesso`);
            });
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) => (
                        <TableRow
                            key={restaurante.id}
                        >
                            <TableCell component="th" scope="row">
                                {restaurante.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {restaurante.nome}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`} >editar</Link> ]
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button onClick={() => excluirRestaurante(restaurante)} variant="outlined" color="error" >Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}