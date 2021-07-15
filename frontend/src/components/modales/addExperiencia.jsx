import React, { useState } from 'react'

const AddExperiencia = ({editarUser, user }) => {

    const [experiencia, setExperiencia] = useState({
        titulo: '',
        empresa: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
    })

const handleInputChange = e => {
    const { name, value } = e.target
    setExperiencia({ ...experiencia, [name]: value })
}

const handleSubmit = e => {
    e.preventDefault();
    user.usuarioDB.experiencia.push(experiencia);
    // console.log(user);
    editarUser(user);
}

return (
    <div className="modal fade" id="addExperiencia" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Añadir Experiencia</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="container main-añadir-oferta">
                        <form className="añadir-oferta-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Añada el titulo de su trabajo"
                                    name="titulo"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Empresa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Añada el nombre de la empresa"
                                    name="empresa"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Fecha Inicio</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Añada la fecha de inicio en su trabajo"
                                    name="fechaInicio"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Fecha final</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Añada la fecha de finalización de su trabajo"
                                    name="fechaFin"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Añada una breve descripción de su puesto laboral"
                                    name="descripcion"
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card-footer">
                    <button className="btnAddOferta" data-bs-dismiss="modal" onClick={handleSubmit} type="submit">Añadir Experiencia</button>
                </div>
            </div>
        </div>
    </div>
);
}

export default AddExperiencia