import React, { useState } from 'react'

const AddSkill = ({user}) => {
    const [habilidad, setHabilidad] = useState("")

    const handleInputChange = e => {
        const { value } = e.target
        setHabilidad(value)
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
        // console.log(oft.titulo);
    }

    const handleSubmit = e => {
        e.preventDefault();
        user.usuarioDB.skills.push(habilidad)
        editarUser(user);
    }
    return (
        <div className="modal fade" id="addSkill" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Añadir Habilidad</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container main-añadir-oferta">
                            <form className="añadir-oferta-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>habilidad</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Añada una habilidad"
                                        name="habilidad"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button className="btnAddOferta" onClick={handleSubmit} type="submit">Añadir Habilidad</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSkill;