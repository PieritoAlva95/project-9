import React, { Fragment, useEffect, useState } from 'react'
import AddEstudios from '../components/modales/addEstudios';
import AddExperiencia from '../components/modales/addExperiencia';
import AddSkill from '../components/modales/addSkill';
import Sidebar from '../components/sidebar'
import { Link } from 'react-router-dom';
import TablaEstudios from '../components/tablaEstudios';
import TabalaExperiencia from '../components/tablaExperiencia';

const EditarPerfil = ({ setLogeado }) => {
    const imgURL = "http://localhost:4000/uploads/";
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [usuario, setUsuario] = useState({});
    const [redesSociales, setRedesSociales] = useState({
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: ""
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setRedesSociales({ ...redesSociales, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        user.usuarioDB.redesSociales = redesSociales
        console.log(user);
        editarUser(user)
    }

    const editarUser = async (useredit) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': useredit.token
            },
            body: JSON.stringify(useredit.usuarioDB)
        };
        const response = await fetch('http://localhost:4000/api/usuarios/' + useredit.usuarioDB.uid, requestOptions);
        const data = await response.json();
        window.localStorage.setItem('user', JSON.stringify(data));
        const user = JSON.parse(window.localStorage.getItem('user'));
        setUsuario(user);
        cargarSkills();
        // console.log(oft.titulo);
    }

    const cargarSkills = () => {
        return (
            user.usuarioDB.skills.map(skill => (
                <span>| {skill} </span>
            ))
        );
    }


    useEffect(() => {
        cargarSkills();
    }, [usuario])


    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado} />
            <div className="container main-editar-perfil">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-10">
                        <div className="container">
                            <div className="row">
                                <div className="img-perfil">
                                    <img src={imgURL + user.usuarioDB.img} alt="" />
                                    <br />
                                    <input type="file" name="imf-perfil" id="img-perfil" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <h1>Habilidades</h1>
                            <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#addSkill" ><i className='bx bx-plus-medical'></i></button>
                            <div>
                                {cargarSkills()}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <h1>Experiencia</h1>
                            <Link className="btnLink" to={{ pathname: "/dashboard/perfil/experiencia", state: { experiencia: {} } }}><i className='bx bx-plus-medical'></i></Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Fecha inicio</th>
                                        <th scope="col">Fecha fin</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user.usuarioDB.experiencia.map(exp => (
                                            <TabalaExperiencia experiencia={exp} user={user} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12">
                            <h1>Estudios</h1>
                            <Link className="btnLink" to={{ pathname: "/dashboard/perfil/estudios", state: { estudio: {} } }}><i className='bx bx-plus-medical'></i></Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Fecha inicio</th>
                                        <th scope="col">Fecha fin</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user.usuarioDB.estudios.map(estudio => (
                                            <TablaEstudios estudio={estudio} user={user} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12">
                            <h1>REDES SOCIALES</h1>
                            <form className="añadir-oferta-form" onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <i class='bx bxl-facebook-square'></i>
                                    <input
                                        type="text"
                                        name="facebook"
                                        defaultValue={user.usuarioDB.redesSociales[0].facebook}
                                        id="facebook"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <i class='bx bxl-twitter' ></i>
                                    <input
                                        type="text"
                                        name="twitter"
                                        defaultValue={user.usuarioDB.redesSociales[0].twitter}
                                        id="twitter"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <i class='bx bxl-instagram' ></i>
                                    <input
                                        type="text"
                                        name="instagram"
                                        defaultValue={user.usuarioDB.redesSociales[0].instagram}
                                        id="instagram"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <i class='bx bxl-linkedin-square' ></i>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        defaultValue={user.usuarioDB.redesSociales[0].linkedin}
                                        id="linkedin"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <button className="btn-submit"><i class='bx bxs-save' ></i> Guardar Cambios</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <AddSkill editarUser={editarUser} user={user} />
        </Fragment>
    );
}

export default EditarPerfil