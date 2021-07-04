import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import image from '../assets/worker.jpg';

const LoginPage = (props) => {
    const history = useHistory();
    const [usuario, setusuario] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        setusuario({ ...usuario, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(usuario)
        // props.login(usuario)
    }
    const login = async (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:4000/api/login', requestOptions);
        const data = await response.json();
        window.localStorage.setItem('user', JSON.stringify(data));
        history.push("/dashboard");
    }
    return (
        <div className="container mainlogin">
            <div className="row">
                <div className="col-lg-6 imagen">
                    <img src={image} alt="" />
                </div>
                <div className="col-lg-6 formulario">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Ingresa un correo" name="email" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Ingresa tu contraseña" name="password" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit">Ingresar</button>
                        <p className="forgot-password text-right">
                            Forgot password?
                        </p>
                        <Link className="link" to="/registro">Registrate!</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;