import React, { Fragment } from 'react';
import foto from '../assets/foto.jpg';

const ListaPersonas = ({persona}) =>{
    const imgURL = "http://localhost:4000/uploads/";
    console.log(persona);
    return(
        <Fragment>
            <div className="container lista-personas">
                <div className="row">
                    <div className="col-2">
                        <img src={imgURL + persona.foto} alt="" />
                    </div>
                    <div className="col-10 nombres-apellidos">
                        <h4>{persona.nombres}</h4>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPersonas;