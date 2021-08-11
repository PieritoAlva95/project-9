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
                        <Link className="link" to={{ pathname: "/perfil", state: { user: persona.postulante } }} >{persona.nombres} {persona.apellidos}</Link>
                    </div>
                    <div className="col-3">
                        <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#confirmContratar"> Contratar</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="confirmContratar" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">CONTRATAR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Esta seguro de contratar a este postulante?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={contratar}>Contratar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPersonas;