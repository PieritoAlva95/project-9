import React, { Fragment } from 'react';
import ListaPersonas from '../components/listaPersonas'
import Sidebar from '../components/sidebar'

const VisualizarOferta = ({ setLogeado, location }) => {
  const oferta = location.state.oft;

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
                      <ListaPersonas key={persona._id} persona={persona} />
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
