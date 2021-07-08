import Navbar from './components/nabvar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login'
import Main from './pages/main'
import Perfil from './pages/perfil'
import Dashboard from './pages/dashboard';
import Oferta from './pages/oferta';
import Registro from './pages/registro';
import EditarOferta from './components/editOferta';
import PageNotFound from './pages/notFound';
import { useState } from 'react';

const App =() => {
  
  return (
    <Router>
      <div className="container-fluid">
          <Navbar></Navbar>
      </div>
      <Switch>
        <Route path="/" component={Main} exact>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/perfil" component={Perfil}></Route>
        <Route path="/dashboard" component={Dashboard} exact/>
        <Route path="/oferta" component={Oferta} />
        <Route path="/registro" component={Registro} />
        <Route path="/dashboard/editar-oferta" component={EditarOferta} exact />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
    
  );
}

export default App;
