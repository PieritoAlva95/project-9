import React, { Fragment, useState } from 'react';
import { useHistory} from 'react-router-dom';

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
        const response = await fetch('http://localhost:4000/api/oferta/'+oft._id, requestOptions);
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
                    <div className="form-group">
                        <label>Titulo</label>
                        <input type="text" className="form-control" placeholder="Enter title" name="titulo" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea type="text" className="form-control" placeholder="Enter description" name="cuerpo" onChange={handleInputChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Precio</label>
                        <input type="number" className="form-control" name="precio" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Categoria</label>
                        <input type="text" className="form-control" placeholder="Enter Category" name="categoria" onChange={handleInputChange} />
                    </div>
                    <button>Guardar Cambios</button>
                </form>
            </div>

        </Fragment >
    );
}
export default EditarOferta;