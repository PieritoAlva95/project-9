import React, { Fragment, useState, useEffect } from 'react';
import AñadirOferta from '../components/añadirOferta';
import TablaOfertas from '../components/tablaOfertas';
import Sidebar from '../components/sidebar';
import { useHistory } from 'react-router-dom';
import TablaContratos from '../components/tablaContratos';

const Dashboard = ({ setLogeado }) => {
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log(user);
  if (user == null) {
    console.log("olaa oal aola");
    history.push('/');
  }

  let lista = [];
  const [listaOfertas, setListaOfertas] = useState([]);
  const [ofertasContratos, setOfertasContratos] = useState([])

  const crearOferta = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      'http://localhost:4000/api/oferta',
      requestOptions
    );
    const dataREs = await response.json();
    console.log(dataREs);
    cargarOfertasByUser();
  };

  const cargarOfertasByUser = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        'http://localhost:4000/api/oferta/usuario/' + user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setListaOfertas(data);

      lista.push(data);
    }
  };

  const cargarOfertasContratos = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const resp = await fetch(
        'http://localhost:4000/api/oferta/usuario/contratos/' + user.usuarioDB.uid,
        requestOptions
      );
      const res = await resp.json();
      setOfertasContratos(res);
      console.log(res);
    }
  }

  const finalizarContrato = async (oferta) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token
      },
      body: JSON.stringify(oferta)
    };
    const response = await fetch('http://localhost:4000/api/oferta/' + oferta._id, requestOptions);
    const data = await response.json();
    setOfertasContratos(data);
  }

  const presentarContratos = () => {
    return (
      ofertasContratos.map((oferta) => (
        <TablaContratos
          key={oferta._id}
          oferta={oferta}
          finalizarContrato={finalizarContrato}
        />
      ))
    );
  }

  useEffect(() => {
    cargarOfertasByUser()
  }, []);

  useEffect(() => {
    cargarOfertasContratos()
  }, []);

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado}></Sidebar>
      <div className='container-fluid main-dashboard'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-10'>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop'
            >
              Añadir
            </button>
            <div className='main-tabla'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Titulo</th>
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {listaOfertas.map((oferta) => (
                    <TablaOfertas
                      key={oferta._id}
                      oferta={oferta}
                      metodoCargarDatos={cargarOfertasByUser}
                    ></TablaOfertas>
                  ))}
                </tbody>
              </table>
            </div>
            <h1>Contratos</h1>
            <div className='main-tabla'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Titulo</th>
                    <th scope='col'>Nombres</th>
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  { presentarContratos() }
                </tbody>
              </table>
            </div>{
              user ?
                <AñadirOferta metodoCrearOferta={crearOferta}></AñadirOferta>
                :
                <span></span>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
