import React, { Fragment, useState } from 'react';

const AñadirOferta = () => {
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

    const crearOferta = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token
            },
            body: JSON.stringify(oferta)
        };
        const response = await fetch('http://localhost:4000/api/oferta', requestOptions);
        const data = await response.json();
        console.log(data);
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(oferta);
        crearOferta();
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
                                <form className="añadir-oferta-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Titulo</label>
                                        <input type="text" className="form-control" placeholder="Enter title" name="titulo" onChange={handleInputChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <input type="text" className="form-control" placeholder="Enter description" name="cuerpo" onChange={handleInputChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Precio</label>
                                        <input type="number" className="form-control" name="precio" onChange={handleInputChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Categoria</label>
                                        <input type="text" className="form-control" placeholder="Enter Category" name="categoria" onChange={handleInputChange} />
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button data-bs-dismiss="modal" className="btnAddOferta" onClick={handleSubmit} type="submit">Añadir Oferta</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default AñadirOferta;