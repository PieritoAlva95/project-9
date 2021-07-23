import React, { Fragment, useEffect, useState } from 'react'
import AddEstudios from '../components/modales/addEstudios';
import AddExperiencia from '../components/modales/addExperiencia';
import AddSkill from '../components/modales/addSkill';
import Sidebar from '../components/sidebar'

const EditarPerfil = ({ setLogeado }) => {
    const imgURL = "http://localhost:4000/uploads/";
    const user = JSON.parse(window.localStorage.getItem('user'));
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
        console.log(data);
        window.localStorage.setItem('user', JSON.stringify(data));
        console.log(user);
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
    const cargarExperiencia = () => {
        return (
            user.usuarioDB.experiencia.map(exp => (
                <tr key={exp._id}>
                    <th scope="row">{exp.titulo}</th>
                    <td>{exp.descripcion}</td>
                    <td>{exp.fechaInicio}</td>
                    <td>{exp.fechaFin}</td>
                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#editar">
                        <i className='bx bx-edit'></i>
                    </button>
                    <button type="button" className="btnDelete" data-bs-toggle="modal" data-bs-target="#confirmDelete">
                        <i className='bx bx-trash'></i>
                    </button></td>
                </tr>
            ))
        );
    }
    const cargarEstudios = () => {
        return (
            user.usuarioDB.estudios.map(estudio => (
                <tr key={estudio._id}>
                    <th scope="row">{estudio.titulo}</th>
                    <td>{estudio.descripcion}</td>
                    <td>{estudio.fechaInicio}</td>
                    <td>{estudio.fechaFin}</td>
                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#editar">
                        <i className='bx bx-edit'></i>
                    </button>
                    <button type="button" className="btnDelete" data-bs-toggle="modal" data-bs-target="#confirmDelete">
                        <i className='bx bx-trash'></i>
                    </button></td>
                </tr>
            ))
        );
    }

    useEffect(() => {
        cargarSkills()
    }, [user])


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
                            <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#addExperiencia"><i className='bx bx-plus-medical'></i></button>
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
                                    {cargarExperiencia()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12">
                            <h1>Estudios</h1>
                            <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#addEstudios"><i className='bx bx-plus-medical'></i></button>
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
                                    {cargarEstudios()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12">
                            <h1>AÑADIR REDES SOCIALES</h1>
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
            <AddExperiencia editarUser={editarUser} user={user} />
            <AddEstudios editarUser={editarUser} user={user} />

            <div className="modal fade" id="confirmDelete" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ELIMINAR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Esta seguro de eliminar?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editar" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ELIMINAR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Esta seguro de elasdasdasdiminar?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditarPerfil