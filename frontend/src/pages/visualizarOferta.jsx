import React, { Fragment } from 'react';
import ListaPersonas from '../components/listaPersonas'
import Sidebar from '../components/sidebar'

const VisualizarOferta = ({ setLogeado, location }) => {
  const oferta = location.state.oft;
  const user = JSON.parse(window.localStorage.getItem('user'));

  const realizarContrato = async (personaID) => {
    console.log(personaID);
    const interesadoContratado = oferta.interesados.findIndex(post => post.postulante === personaID);
    oferta.interesados[interesadoContratado].aceptado = true;
    oferta.disponible = false;
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
    console.log(data);

  }

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado} />
      <div className='container visualizar-oferta'>
        <div className='row'>
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div className="container">
              <div className="row">
                <div className='col-lg-6 body-oferta'>
                  <h1>{oferta.titulo}</h1>
                  <h4 className='usuario'>{oferta.nombreUsuario}</h4>
                  <p>{oferta.cuerpo}</p>
                  <p>
                    <strong>Categoria:</strong> {oferta.categoria}
                  </p>
                  <p>
                    <strong>Salario:</strong> {oferta.precio}
                  </p>
                </div>
                <div className='col-lg-6 personas'>
                  <h2>Personas que estan ofertando</h2>
                  <div className='container lista-personas'>
                    {oferta.interesados.map((persona) => (
                      <ListaPersonas key={persona._id} persona={persona} metodoContratar={realizarContrato} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VisualizarOferta;
