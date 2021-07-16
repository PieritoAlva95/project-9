import React, { Fragment } from 'react';
import './components.css';
import { Link } from 'react-router-dom';

const ListaOfertas = ({ oferta }) => {

    const postularseOferta = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'));

        if (user === null) {
            alert("No ha iniciado sesión");
            console.log("ola no hay sesion");
        }
        if (user != null) {
            const interesado = {
                postulante: user.usuarioDB.uid,
                nombres: user.usuarioDB.nombres + " " + user.usuarioDB.apellidos,
                foto: user.usuarioDB.img
            }
            oferta.interesados.push(interesado);
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-token': user.token },
                body: JSON.stringify(oferta)
            };
            const response = await fetch('http://localhost:4000/api/postulante/' + oferta._id, requestOptions);
            const data = await response.json();
            if (data.ok === true) {
                alert("Su postulación se ha realizado correctamente");
            } else {
                alert("Su postulación no pudo procesarse");
            }

        }

    }
    return (
        <Fragment>
            <div className="oferta">
                <Link className="link" to={{ pathname: "/oferta", state: { oferta: oferta } }}><h4>{oferta.titulo}</h4></Link>
                <Link className="link" to={{ pathname: "/perfil", state: { user: oferta.usuario } }}><h6>{oferta.nombreUsuario}</h6></Link>
                <p>{oferta.cuerpo}</p>
                <span><strong>Categoria:</strong> {oferta.categoria}</span> <br />
                <small><strong>Salario:</strong> {oferta.precio}</small> <br />
                <button data-bs-toggle="modal" data-bs-target="#postularse">Postularse</button>
                <span>Ofertas: {oferta.interesados.length}</span>
            </div>


            <div class="modal fade" id="postularse" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirmar Postulación</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Esta seguro de postularse al puesto " {oferta.titulo} "</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn-submit" onClick={postularseOferta}>Enviar Postulación</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default ListaOfertas;