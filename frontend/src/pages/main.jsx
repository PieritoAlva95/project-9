import React, { useState, useEffect } from 'react';
import ListaOfertas from '../components/listaOfertas';
import './pages.css';

const Main = ({ logeado }) => {
  const [ofertas, setOfertas] = useState([]);
  console.log(logeado);
  const cargarOfertas = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (!logeado) {
      const response = await fetch(
        'http://localhost:4000/api/oferta',
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
      console.log(data.ofertas);
    }

    if (logeado) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const response = await fetch(
        'http://localhost:4000/api/oferta/usuario/get-ofertas/' + user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data);
      console.log(data);
    }

  };

  const presentarListaOfertas = () => {
    if (ofertas.length > 0) {
      return(
        ofertas.map((oferta) => (
          <ListaOfertas key={oferta._id} oferta={oferta} logeado={logeado}></ListaOfertas>
        ))
      )
    } else {
      return(<h1>NO HAY DATA</h1>)
    }
  }
  useEffect(() => {
    cargarOfertas();
  }, logeado);

  // console.log(ofertas);

  const presentarOfertas = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-9'>
            {
              logeado ? "" : <p>Recuerde que para poder postularse a un trabajo debe tener una cuenta e iniciar sesión</p>
            }
            {
              presentarListaOfertas()
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container main-section'>
      <div className='row'>{presentarOfertas()}</div>
    </div>
  );
};
export default Main;
