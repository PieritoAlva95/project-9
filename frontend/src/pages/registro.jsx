import React, { Fragment, useState } from 'react';
import image from '../assets/worker.jpg';
import { useHistory } from 'react-router-dom';

const Registro = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario.password !== usuario.confirmPassword) {
      alert('Las contraseñas no son iguales');
    } else {
      registrar(usuario);
    }
    // props.login(ususario)
  };

  const registrar = async (usuario) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    };
    const response = await fetch(
      'http://localhost:4000/api/usuarios',
      requestOptions
    );
    const data = await response.json();
    if (data.msg === 'correo existente') {
      alert('El correo ya esta vinculado a una cuenta');
    } else if (data.ok === false) {
      alert('Ha ocurrido un error al registrar el usuario');
    } else if (data.ok === true) {
      history.push('/login');
    }
  };

  return (
    <Fragment>
      <div className='container main-registro'>
        <div className='row'>
          <div className='col-lg-6 imagen'>
            <img src={image} alt='' />
          </div>
          <div className='col-lg-6 formulario'>
            <form className='login-form' onSubmit={handleSubmit}>
              <h3>Regístrate!</h3>
              <p>* campos obligatorios</p>
              <div className='form-group'>
                <label>Nombres</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tu nombre'
                  name='nombres'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Apellidos</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tus apellidos'
                  name='apellidos'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Cedula</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tu cedula de identidad'
                  name='documentoDeIdentidad'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Telefono</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tu número'
                  name='numeroDeCelular'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Correo</label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='* Ingresa tu correo'
                  name='email'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Contraseña</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='* Ingresa tu contraseña'
                  name='password'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Confirmar Contraseña</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='* Ingresa nuevamente tu contraseña'
                  name='confirmPassword'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type='submit'>Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Registro;
