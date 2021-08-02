import Navbar from './components/nabvar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import Perfil from './pages/perfil';
import Dashboard from './pages/dashboard';
import Oferta from './pages/oferta';
import Registro from './pages/registro';
import EditarOferta from './components/editOferta';
import PageNotFound from './pages/notFound';
import { useState } from 'react';
import VisualizarOferta from './pages/visualizarOferta';
import EditarPerfil from './pages/editarPerfil';
import ReseteoPassword from './pages/reseteoPassword';
import AddExperiencia from './components/modales/addExperiencia';
import AddEstudios from './components/modales/addEstudios';
import VerPerfil from './components/verPerfil';
import AdminUsers from './pages/adminUsers';
import Contratos from './components/contratos';
import AdminOfertas from './pages/adminOfertas';

const App = () => {
  const [logeado, setLogeado] = useState(false);
  const [busqueda, setBusqueda] = useState({});

  const editarUser = async (useredit) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': useredit.token
      },
      body: JSON.stringify(useredit.usuarioDB)
    };
    const response = await fetch('http://localhost:4000/api/usuarios/' + useredit.usuarioDB.uid, requestOptions);
    const data = await response.json();
    console.log(data);
    var user = window.localStorage.setItem('user', JSON.stringify(data));
    console.log(user);
  }

  const buscarOfertas = async (texto) => {
    if (texto.length > 0) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        'http://localhost:4000/api/oferta/busqueda/' + texto,
        requestOptions
      );
      const data = await response.json();
      setBusqueda(data.ofertas);
    }
  }

  return (
    <Router>
      <div className='container-fluid'>
        <Navbar logeado={logeado} metodoBusqueda={buscarOfertas} setLogeado={setLogeado}></Navbar>
      </div>
      <Switch>
        <Route path='/' component={(routeProps) => (
          <Main {...routeProps} logeado={logeado} busqueda={busqueda} />
        )} exact></Route>
        <Route
          path='/login'
          component={(routeProps) => (
            <Login {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />
        <Route path='/perfil' component={Perfil} exact />
        <Route
          path='/dashboard'
          component={(routeProps) => (
            <Dashboard {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />
        <Route path='/oferta' component={(routeProps) => (
          <Oferta {...routeProps} logeado={logeado} />
        )} exact />
        <Route path='/registro' component={Registro} exact />
        <Route path='/reseteo-password' component={ReseteoPassword} exact />
        <Route path='/dashboard/editar-oferta' component={(routeProps) => (
          <EditarOferta {...routeProps} setLogeado={setLogeado} />
        )} exact />
        <Route
          path='/dashboard/visualizar-oferta'
          component={(routeProps) => (
            <VisualizarOferta {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />
        <Route
          path='/dashboard/editar-perfil'
          component={(routeProps) => (
            <EditarPerfil {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />
        <Route path="/dashboard/perfil/experiencia" component={(routeProps) => (
          <AddExperiencia {...routeProps} editarUser={editarUser} setLogeado={setLogeado} />
        )} />
        <Route path="/dashboard/perfil/estudios" component={(routeProps) => (
          <AddEstudios {...routeProps} editarUser={editarUser} setLogeado={setLogeado} />
        )} />
        <Route
          path='/dashboard/ver-perfil'
          component={(routeProps) => (
            <VerPerfil {...routeProps} logeado={logeado} setLogeado={setLogeado} />
          )}
          exact
        />

        <Route
          path='/dashboard/admin/usuarios'
          component={(routeProps) => (
            <AdminUsers {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />
        <Route
          path='/dashboard/admin/ofertas'
          component={(routeProps) => (
            <AdminOfertas {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />
        <Route
          path='/dashboard/contratos'
          component={(routeProps) => (
            <Contratos {...routeProps} setLogeado={setLogeado} />
          )}
          exact
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
