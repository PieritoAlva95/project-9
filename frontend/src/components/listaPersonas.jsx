import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ListaPersonas = ({ persona, metodoContratar }) => {
    const imgURL = "http://localhost:4000/uploads/";

    const contratar = () => {
        metodoContratar(persona.postulante)
    }
    return (
        <Fragment>
            <div className="container lista-personas">
                <div className="row">
                    <div className="col-2">
                        <img src={imgURL + persona.foto} alt="" />
                    </div>
                    <div className="col-7 nombres-apellidos">
                        <Link className="link" to={{ pathname: "/perfil", state: { user: persona.postulante } }} >{persona.nombres}</Link>
                    </div>
                    <div className="col-3">
                        <button className="btn-submit" onClick={contratar}> Contratar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPersonas;