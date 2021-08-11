import React, { Fragment, useState } from 'react'
import Sidebar from '../sidebar';
import { useHistory } from 'react-router-dom';


const EditarEstudios = ({ location, editarUser, setLogeado, setCargar }) => {
    const history = useHistory();
    const estudio = location.state.estudio;
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [seleccionado, setSeleccionado] = useState(false);

    const [estudios, setEstudios] = useState({
        _id: estudio._id,
        nombreInstitucion: estudio.nombreInstitucion,
        titulo: estudio.titulo,
        fechaInicio: estudio.fechaInicio,
        fechaFin: estudio.fechaFin,
        descripcion: estudio.descripcion
    })

    
    if(user === null){
        history.push('/login');
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setEstudios({ ...estudios, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const est = user.usuarioDB.estudios.find((post) => post._id === estudios._id);
        if (est !== undefined) {
            const est = user.usuarioDB.estudios.findIndex((post) => post._id === estudios._id);
            user.usuarioDB.estudios[est] = estudios;
        } else {
            user.usuarioDB.estudios.push(estudios);
        }
        editarUser(user);
        setCargar(true);
        setTimeout(function(){
            history.push("/dashboard/editar-perfil");
        },500);
    }

    const check = () => {
        var checkbox = document.getElementById('flexCheckDefault');
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                setSeleccionado(true);
                // eslint-disable-next-line
                setEstudios({ ...estudios, ["fechaFin"]: "Estudio Actual" })
            } else {
                setSeleccionado(false);
                // eslint-disable-next-line
                setEstudios({ ...estudios, ["fechaFin"]: estudio.fechaFin })
            }
        });
    }

    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado}></Sidebar>
            <div className="container main-añadir-oferta">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-10">
                        <div className="container">
                            <div className="row">
                                <form className="añadir-oferta-form needs-validation" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Institución</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Añada el nombre de su institución"
                                            name="nombreInstitucion"
                                            defaultValue={estudio.nombreInstitucion}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Titulo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Añada el nombre de su titulo"
                                            name="titulo"
                                            defaultValue={estudio.titulo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Fecha Inicio</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Añada la fecha de inicio de sus estudios"
                                            name="fechaInicio"
                                            defaultValue={estudio.fechaInicio}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={check} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Estudio Actual
                                        </label>
                                    </div>
                                    {
                                        seleccionado ?
                                            ""
                                            :
                                            <div className="form-group">
                                                <label>Fecha Fin</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Añada la fecha de finalización de sus estudios"
                                                    name="fechaFin"
                                                    defaultValue={estudio.fechaFin}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                    }
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Añada una breve descripción de sus estudios"
                                            name="descripcion"
                                            defaultValue={estudio.descripcion}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className="btnAddOferta" type="submit">Guardar</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditarEstudios;