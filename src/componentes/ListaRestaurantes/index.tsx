import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import IPaginacao from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Grid, Input, TextField, Button } from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    const paginacao = await buscarRestaurantes();
    setRestaurantes(response.data.results)
    setProximaPagina(response.data.next)

  }, []);

  async function buscarRestaurantes(params?: any): Promise<IPaginacao<IRestaurante>> {
    const result = await axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/',);
    return result.data;
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

  function pesquisarRestaurante() {

  }

  function resetPesquisa() { }

  return (<section className={style.ListaRestaurantes}>
    <Grid container spacing={2}>
      <Grid item>
        <TextField value={search} onChange={(event) => setSearch(event.target.value)} id="outlined-basic" label="Buscar restaurante" variant="outlined" />
      </Grid>
      <Grid item >
        <Button style={{ height: '55px' }} variant="contained">Pesquisar</Button>
      </Grid>
      {<Grid item >
        <Button style={{ height: '55px' }} variant="outlined">Pesquisar</Button>
      </Grid>}
    </Grid>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={() => irParaProximaPagina()} >Ver mais</button>}
  </section>)
}

export default ListaRestaurantes