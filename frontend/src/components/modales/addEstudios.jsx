import React, { useState } from 'react'

const AddEstudios = ({ editarUser, user }) => {
    const [estudios, setEstudios] = useState({
        nombreInstitucion: '',
        titulo: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
    setEstudios({ ...estudios, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        user.usuarioDB.estudios.push(estudios)
        editarUser(user);
    }
    return (
        <div className="modal fade" id="addEstudios" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Añadir Estudios</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container main-añadir-oferta">
                            <form className="añadir-oferta-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Institución</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Añada el nombre de su institución"
                                        name="nombreInstitucion"
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
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Fecha Fin</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Añada la fecha de finalización de sus estudios"
                                        name="fechaFin"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Añada una breve descripción de sus estudios"
                                        name="descripcion"
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button className="btnAddOferta" data-bs-dismiss="modal" onClick={handleSubmit} type="submit">Añadir Estudio</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEstudios;