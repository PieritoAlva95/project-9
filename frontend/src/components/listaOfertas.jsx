import React from 'react';
import './components.css';

const ListaOfertas = ({ oferta }) => {
    return (
        <div className="oferta col-lg-5">
            <div className="etiqueta">
                <img className="avatar" src="https://images.unsplash.com/photo-1555170629-9240c8e7df1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80" alt="" />
                <h4>{oferta.titulo}</h4>
                <h6>{oferta.usuario}</h6>
                <br />
                <p>{oferta.cuerpo}</p>
                <p>{oferta.categoria}</p>
                <p>{oferta.precio}</p>
                <button><i class='bx bxs-send'></i> Ofertar</button>
                <span>Ofertas: 4</span>
            </div>
        </div>
    );
}
export default ListaOfertas;