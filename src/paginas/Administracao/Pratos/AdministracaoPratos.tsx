import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IPrato from '../../../interfaces/IPrato';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import http from '../../../http';

export default function AdministracaoPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get<IPrato[]>('pratos/').then((result) => {
            setPratos(result.data);
        });
    }, []);

    function excluirPrato(prato: IPrato) {
        http.delete(`pratos/${prato.id}/`).then((_) => {
            http.get<IPrato[]>('pratos/').then((result) => {
                setPratos(result.data);
                alert(`Prato ${prato.nome} excluído com sucesso`);
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
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((prato) => (
                        <TableRow
                            key={prato.id}
                        >
                            <TableCell component="th" scope="row">
                                {prato.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {prato.nome}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {prato.tag}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                [ <a href={prato.imagem} rel='noreferrer' target='_blank' >ver imagem</a> ]
                            </TableCell>
                            <TableCell component="th" scope="row">
                                [ <Link to={`/admin/pratos/${prato.id}`} >editar</Link> ]
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button onClick={() => excluirPrato(prato)} variant="outlined" color="error" >Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}