import React from 'react';
import './components.css';
import { Link } from 'react-router-dom';

const ListaOfertas = ({ oferta }) => {
    return (
        <div className="oferta col-lg-6">
            <div className="etiqueta">
                <div className="header">
                    <i class='bx bx-briefcase'></i>
                    <Link className="link" to={{ pathname: "/oferta", state: { oferta: oferta } }}><h5>{oferta.titulo}</h5></Link>
                    <Link className="link" to={{pathname:"/perfil", state:{user:oferta.usuario}}}><h6>{oferta.nombreUsuario}</h6></Link>
                </div>
                <div className="cuerpo">
                    <p>{oferta.cuerpo}</p>
                    <span><strong>Categoria:</strong> {oferta.categoria}</span> <br />
                    <small><strong>Salario:</strong> {oferta.precio}</small> <br />
                    <button><i class='bx bxs-send'></i> Ofertar</button>
                    <span>Ofertas: 4</span>
                </div>
            </div>
        </div>
    );
}
export default ListaOfertas;