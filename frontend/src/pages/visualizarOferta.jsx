import React from 'react'

const VisualizarOferta = ({ location }) => {
    const oferta = location.state.oft;
    const imgURL = "http://localhost:4000/uploads/";

    const contratar = (id) =>{
        alert("contratar " + id);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 body-oferta">
                    <h1>{oferta.titulo}</h1>
                    <h4 className="usuario">{oferta.nombreUsuario}</h4>
                    <p>{oferta.cuerpo}</p>
                    <p><strong>Categoria:</strong> {oferta.categoria}</p>
                    <p><strong>Salario:</strong> {oferta.precio}</p>
                </div>
                <div className="col-lg-6 personas">
                    <h2>Personas que estan ofertando</h2>
                    {
                        oferta.interesados.map(persona => (
                            <div className="container lista-personas">
                                <div className="row">
                                    <div className="col-2">
                                        <img src={imgURL + persona.foto} alt="" />
                                    </div>
                                    <div className="col-10 nombres-apellidos">
                                        <h4>{persona.nombres}</h4>
                                        <button className="btn-submit" onClick={contratar(persona.postulante)}><i className='bx bx-dollar'></i> Contratar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default VisualizarOferta;