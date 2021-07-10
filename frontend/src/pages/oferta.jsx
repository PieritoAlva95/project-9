import React, { Fragment } from 'react';
import ListaPersonas from '../components/listaPersonas';

const Oferta = ({ location }) => {
    const oferta = location.state.oferta;

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
        <Fragment>
            <div className="container main-oferta">
                <div className="row">
                    <div className="col-lg-6 body-oferta">
                        <h1>{oferta.titulo}</h1>
                        <h4 className="usuario">{oferta.nombreUsuario}</h4>
                        <p>{oferta.cuerpo}</p>
                        <p><strong>Categoria:</strong> {oferta.categoria}</p>
                        <p><strong>Salario:</strong> {oferta.precio}</p>
                        <button onClick={postularseOferta}><i class='bx bxs-send'></i> Ofertar</button>
                    </div>
                    <div className="col-lg-6 personas">
                        <h2>Personas que estan ofertando</h2>
                        {
                            oferta.interesados.map(persona => (
                                <ListaPersonas persona={persona}></ListaPersonas>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Oferta;