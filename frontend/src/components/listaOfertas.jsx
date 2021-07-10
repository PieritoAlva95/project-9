import React from 'react';
import './components.css';
import { Link } from 'react-router-dom';

const ListaOfertas = ({ oferta }) => {

    const postularseOferta = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        const oft = oferta.interesados.find(post => post.postulante === user.usuarioDB.uid);
        if (oft) {
            alert("Ya se ha postulado en esta oferta de trabajo");
        } else {
            if (user != null) {
                console.log(user);
                const interesado = {
                    postulante: user.usuarioDB.uid,
                    nombres: user.usuarioDB.nombres + " " + user.usuarioDB.apellidos,
                    foto:user.usuarioDB.img
                }
                oferta.interesados.push(interesado);
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-token': user.token },
                    body: JSON.stringify(oferta)
                };
                const response = await fetch('http://localhost:4000/api/postulante/' + oferta._id, requestOptions);
                const data = await response.json();
                if (data.ok == true) {
                    alert("Su postulación se ha realizado correctamente");
                } else {
                    alert("Su postulación no pudo procesarse");
                }

            } else {
                alert("No ha iniciado sesión");
            }

            console.log(oferta);
        }

    }
    return (
        <div className="oferta">
            <Link className="link" to={{ pathname: "/oferta", state: { oferta: oferta } }}><h4>{oferta.titulo}</h4></Link>
            <Link className="link" to={{ pathname: "/perfil", state: { user: oferta.usuario } }}><h6>{oferta.nombreUsuario}</h6></Link>
            <p>{oferta.cuerpo}</p>
            <span><strong>Categoria:</strong> {oferta.categoria}</span> <br />
            <small><strong>Salario:</strong> {oferta.precio}</small> <br />
            <button onClick={postularseOferta}>Postularse</button>
            <span>Ofertas: {oferta.interesados.length}</span>
        </div>
    );
}
export default ListaOfertas;