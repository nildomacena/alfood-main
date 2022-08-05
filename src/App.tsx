import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurantes from './paginas/Administracao/AdministracaoRestaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/AdministracaoRestaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/AdministracaoRestaurantes/PaginaBaseAdmin/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<PaginaBaseAdmin />} >
        <Route path="" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
