import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import IPaginacao from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Grid, Input, TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const ListaRestaurantes = () => {
  const ordenadores = ['id', 'nome', 'pratos'];
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [ordenador, setOrdenador] = useState('');

  useEffect(() => {
    buscarRestaurantes().then((paginacao) => {
      console.log('Restaurantes carregados');
    });

  }, []);

  async function buscarRestaurantes(params?: any): Promise<void> {
    const result = await axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', { params: params });
    setRestaurantes(result.data.results);
    setProximaPagina(result.data.next);
  }

  function irParaProximaPagina() {
    if (proximaPagina) {
      axios.get<IPaginacao<IRestaurante>>(proximaPagina).then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results])
        setProximaPagina(response.data.next)
      }).catch((err) => {
        console.error('Erro ao buscar restaurantes', err);
      });
    }
  }

  function pesquisarRestaurante(event: React.FormEvent<HTMLFormElement>) {
    console.log('pesquisarRestaruatne')
    event.preventDefault();
    buscarRestaurantes({
      search,
      ordering: ordenador
    }).then((_) => {
      console.log('Restaurantes carregados');
    })
  }

  function resetPesquisa() {
    setSearch('');
    setOrdenador('');
    buscarRestaurantes().then((_) => {
      console.log('Restaurantes carregados');
    })
  }

  function onSelecionaOrdenador(order: string) {
    setOrdenador(order);
  }

  return (<section className={style.ListaRestaurantes}>
    <form onSubmit={(event) => pesquisarRestaurante(event)} >

      <Grid container spacing={2}>
        <Grid item>
          <TextField value={search} onChange={(event) => setSearch(event.target.value)} id="outlined-basic" label="Buscar restaurante" variant="outlined" />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ordenador}
              label="Ordenador"
              onChange={(event: SelectChangeEvent<any>) => onSelecionaOrdenador(event.target.value)}
            >
              {ordenadores.map((o) => <MenuItem value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item >
          <Button type='submit' style={{ height: '55px' }} variant="contained">Pesquisar</Button>
        </Grid>
        {<Grid item >
          <Button type='button' style={{ height: '55px' }} onClick={() => resetPesquisa()} variant="outlined">Limpar Pesquisa</Button>
        </Grid>}
      </Grid>
    </form>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={() => irParaProximaPagina()} >Ver mais</button>}
  </section >)
}

export default ListaRestaurantes