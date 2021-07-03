import React from 'react';
import './components.css';
import {Link} from 'react-router-dom';

const ListaOfertas = ({ oferta }) => {
    return (
        <div className="oferta col-lg-5">
            <div className="etiqueta">
                <i class='bx bx-briefcase'></i>
                <Link className="link" to={{pathname:"/oferta", state:{oferta:oferta}}}><h4>{oferta.titulo}</h4></Link>
                <Link className="link" to="/perfil"><h6>{oferta.nombreUsuario}</h6></Link>
                <br />
                <p>{oferta.cuerpo}</p>
                <span><strong>Categoria:</strong> {oferta.categoria}</span> <br />
                <small><strong>Salario:</strong> {oferta.precio}</small> <br />
                <button><i class='bx bxs-send'></i> Ofertar</button>
                <span>Ofertas: 4</span>
            </div>
        </div>
    );
}
export default ListaOfertas;