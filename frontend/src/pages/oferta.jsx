import React, { Fragment } from 'react';
import ListaPersonas from '../components/listaPersonas';

const Oferta = ({ location }) => {
    const oferta = location.state.oferta;
    return (
        <Fragment>
            <div className="container main-oferta">
                <div className="row">
                    <div className="col-lg-6 oferta">
                        <h1>{oferta.titulo}</h1>
                        <h4 className="usuario">{oferta.nombreUsuario}</h4>
                        <p>{oferta.cuerpo}</p>
                        <p><strong>Categoria:</strong> {oferta.categoria}</p>
                        <p><strong>Salario:</strong> {oferta.precio}</p>
                        <button><i class='bx bxs-send'></i> Ofertar</button>
                    </div>
                    <div className="col-lg-6 personas">
                        <h2>Personas que estan ofertando</h2>
                        <ListaPersonas></ListaPersonas>
                        <ListaPersonas></ListaPersonas>
                        <ListaPersonas></ListaPersonas>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Oferta;