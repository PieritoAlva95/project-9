import React, { Fragment } from 'react';

const Oferta = ({location}) =>{
    const oferta = location.state.oferta;
    return(
        <Fragment>
            <div className="main-oferta">
                <h1>{oferta.titulo}</h1>
                <h6>{oferta.nombreUsuario}</h6>
                <br />
                <p>{oferta.cuerpo}</p>
                <p>Categoria: {oferta.categoria}</p>
                <p>Salario: {oferta.precio}</p>
                <button><i class='bx bxs-send'></i> Ofertar</button>
                <span>Ofertas: 4</span>
            </div>
        </Fragment>
    );
}

export default Oferta;