import React, { Fragment } from 'react';
import foto from '../assets/foto.jpg';

const ListaPersonas = () =>{
    return(
        <Fragment>
            <div className="container lista-personas">
                <div className="row">
                    <div className="col-2">
                        <img src={foto} alt="" />
                    </div>
                    <div className="col-10 nombres-apellidos">
                        <h4>Nombres y Apellidos</h4>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPersonas;