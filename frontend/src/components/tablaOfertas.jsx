import React, { Fragment } from 'react';
import EditarOferta from './editOferta';
import { Link } from 'react-router-dom';

const TablaOfertas = ({ oferta, metodoCargarDatos }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  const eliminarOferta = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token,
      },
    };
    const response = await fetch(
      'http://localhost:4000/api/oferta/' + oferta._id,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    metodoCargarDatos();
    // alert(oferta._id)
  };

  return (
    <Fragment>
      <tr>
        <td>{oferta.titulo}</td>
        <td>{oferta.cuerpo}</td>
        <td>
          <Link
            className='btnLink'
            to={{
              pathname: '/dashboard/visualizar-oferta',
              state: { oft: oferta },
            }}
          >
            <i className='bx bxs-show'></i>
          </Link>
          <Link
            className='btnLink'
            to={{
              pathname: '/dashboard/editar-oferta',
              state: { oft: oferta },
            }}
          >
            <i className='bx bx-edit'></i>
          </Link>
          <button type='button' className='btnDelete' onClick={eliminarOferta}>
            <i className='bx bx-trash'></i>
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default TablaOfertas;
