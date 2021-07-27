import React, { Fragment, useState } from 'react';

const AñadirOferta = ({ metodoCrearOferta }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    const [oferta, setOferta] = useState({
        titulo: '',
        cuerpo: '',
        precio: '',
        categoria: '',
        nombreUsuario: user.usuarioDB.nombres,
        uid: user.usuarioDB.uid
    })
    const handleInputChange = e => {
        const { name, value } = e.target
        setOferta({ ...oferta, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if((oferta.titulo === "") || (oferta.cuerpo === "") || (oferta.precio === "") || (oferta.categoria === "")){
            alert("Los campos son obligatorios");
            
        }else{
            metodoCrearOferta(oferta)
        }
    }
    return (
        <Fragment>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Añadir Oferta de Trabajo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container main-añadir-oferta">
                                <form className="añadir-oferta-form"  onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Titulo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter title"
                                            name="titulo"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter description"
                                            name="cuerpo"
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Precio</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="precio"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Categoria</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Category"
                                            name="categoria"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button data-bs-dismiss="modal" className="btnAddOferta" onClick={handleSubmit} type="submit">Añadir Oferta</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default AñadirOferta;