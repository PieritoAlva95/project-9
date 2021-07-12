import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditarOferta = ({ location }) => {
    const history = useHistory();

    const oft = location.state.oft;
    const user = JSON.parse(window.localStorage.getItem('user'));

    const [oferta, setOferta] = useState({
        _id: oft._id,
        titulo: "",
        cuerpo: "",
        precio: "",
        categoria: "",
        nombreUsuario: user.usuarioDB.nombres,
        uid: user.usuarioDB.uid
    })
    const handleInputChange = e => {
        const { name, value } = e.target
        setOferta({ ...oferta, [name]: value })
    }

    const editarOferta = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token
            },
            body: JSON.stringify(oferta)
        };
        const response = await fetch('http://localhost:4000/api/oferta/' + oft._id, requestOptions);
        const data = await response.json();
        console.log(data);
        // console.log(oft.titulo);
    }
    const handleSubmit = e => {
        e.preventDefault();
        editarOferta()
        history.push("/dashboard");
    }

    return (
        <Fragment>
            <div className="container main-añadir-oferta">
                <form className="añadir-oferta-form" onSubmit={handleSubmit}>
                    <div className="form-group needs-validation">
                        <label>Titulo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter title"
                            defaultValue={oft.titulo}
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
                            defaultValue={oft.cuerpo}
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
                            defaultValue={oft.precio}
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
                            defaultValue={oft.categoria}
                            name="categoria"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className="btn-submit">Guardar Cambios</button>
                </form>
            </div>

        </Fragment >
    );
}
export default EditarOferta;