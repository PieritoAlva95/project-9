import React, { Fragment, useState } from 'react';

const Dashboard = () => {
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

    const cerrarSesion = () =>{
        localStorage.removeItem('user');
    }

    return (
        <Fragment>
            <div className="container main-dashboard">
                <h1>Perfil de {user.usuarioDB.nombres} </h1>
                <button onClick={cerrarSesion}>Cerrar Sesiónn</button>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Añade una oferta de trabajo</h3>

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

                    <button type="submit">Submit</button>
                </form>
            </div>

        </Fragment>
    );
}

export default Dashboard;