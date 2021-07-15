import React, { Fragment } from 'react';

const ListaPersonas = ({ persona }) => {
    const imgURL = "http://localhost:4000/uploads/";

    const contratar = () => {
        console.log(persona.postulante);
    }
    return (
        <Fragment>
            <div className="container lista-personas">
                <div className="row">
                    <div className="col-2">
                        <img src={imgURL + persona.foto} alt="" />
                    </div>
                    <div className="col-10 nombres-apellidos">
                        <h4>{persona.nombres}</h4>
                    </div>
                    <button className="btn-submit" onClick={contratar}> Contratar</button>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPersonas;