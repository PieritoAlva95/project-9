import React, { Fragment, useState } from 'react'
import AddSkill from '../components/modales/addSkill';
import Sidebar from '../components/sidebar'

const EditarPerfil = ({setLogeado}) => {

    const user = JSON.parse(window.localStorage.getItem('user'));

    const addExperiencia= () => {
        alert("añadir exp");
    }

    const addEstudios = () => {
        alert("añadir estudios");
    }

    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado}/>
            <div className="container main-editar-perfil">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-10">
                        <div className="col-lg-12">
                            <h1>Habilidades</h1>
                            <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#addSkill" ><i className='bx bx-plus-medical'></i></button>
                        </div>
                        <div className="col-lg-12">
                            <h1>Experiencia</h1>
                            <button className="btn-submit" onClick={addExperiencia}><i className='bx bx-plus-medical'></i></button>

                        </div>
                        <div className="col-lg-12">
                            <h1>Estudios</h1>
                            <button className="btn-submit" onClick={addEstudios}><i className='bx bx-plus-medical'></i></button>

                        </div>
                    </div>
                </div>
            </div>
            <AddSkill user={user}/>
        </Fragment>
    );
}

export default EditarPerfil