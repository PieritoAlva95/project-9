import React, { Fragment, useState } from 'react';
import image from '../assets/worker.jpg';
import { useHistory, Link } from 'react-router-dom';

const Registro = () => {
    const history = useHistory();
    const [usuario, setUsuario] = useState({})
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setUsuario({ ...usuario, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        registrar(usuario)
        // props.login(ususario)
    }

    const registrar = (usuario) =>{
        console.log(usuario);
    }

    return(
        <Fragment>
            <div className="container main-registro">
            <div className="row">
                <div className="col-lg-6 imagen">
                    <img src={image} alt="" />
                </div>
                <div className="col-lg-6 formulario">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3>Registrate!</h3>

                        <div className="form-group">
                            <label>Nombres</label>
                            <input type="text" className="form-control" placeholder="Ingresa tu nombre" name="nombres" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" className="form-control" placeholder="Ingresa tus apellidos" name="apellidos" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Correo</label>
                            <input type="email" className="form-control" placeholder="Ingresa tu correo" name="correo" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Telefono</label>
                            <input type="text" className="form-control" placeholder="Ingresa tu número" name="numeroDeCelular" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Cedula</label>
                            <input type="text" className="form-control" placeholder="Ingresa tu cedula de identidad " name="documentoDeIdentidad" onChange={handleInputChange} />
                        </div>

                       
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
            </div>
        </Fragment>
    );
}
export default Registro;