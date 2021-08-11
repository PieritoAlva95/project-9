import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Oferta = ({ location, logeado }) => {
  const oferta = location.state.oferta;

  const postularseOferta = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const oft = oferta.interesados.find(
      (post) => post.postulante === user.usuarioDB.uid
    );
    if (oft) {
      alert('Ya se ha postulado en esta oferta de trabajo');
    } else {
      if (user != null) {
        const interesado = {
          postulante: user.usuarioDB.uid,
          nombres: user.usuarioDB.nombres + ' ' + user.usuarioDB.apellidos,
          foto: user.usuarioDB.img,
        };
        oferta.interesados.push(interesado);
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-token': user.token,
          },
          body: JSON.stringify(oferta),
        };
        const response = await fetch(
          'http://localhost:4000/api/postulante/' + oferta._id,
          requestOptions
        );
        const data = await response.json();
        if (data.ok === true) {
          alert('Su postulación se ha realizado correctamente');
        } else {
          alert('Su postulación no pudo procesarse');
        }
      } else {
        alert('No ha iniciado sesión');
      }
    }
  };
  return (
    <Fragment>
      <div className='container main-oferta'>
        <div className='row'>
          <div className='col-lg-12 body-oferta card'>
            <div className='card-header'>
              <h1>{oferta.titulo}</h1>
            </div>
            <div className='card-body'>
              <Link
                className='linkUser'
                to={{ pathname: '/perfil', state: { user: oferta.usuario } }}
              >
                <h3>{oferta.nombreUsuario}</h3>
              </Link>
              <p>{oferta.cuerpo}</p>
              <p>
                <strong>Categoria:</strong> {oferta.categoria}
              </p>
              <p>
                <strong>Salario (USD): </strong> {oferta.precio}
              </p>
              <p>
                <strong>Tipo Pago: </strong>
                {oferta.tipoPago}
              </p>
            </div>

            <div className='card-footer'>
              {logeado ? (
                <button onClick={postularseOferta}>
                  <i className='bx bxs-send'></i> Postular
                </button>
              ) : (
                <p>RECUERDE! Para postularse debe iniciar sesión</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Oferta;
