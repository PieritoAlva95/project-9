import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toggable from './toggable';

const Navbar = ({logeado, setLogeado}) => {

  const user = JSON.parse(window.localStorage.getItem('user'));
  
  useEffect(() => {
    if (user) {
      setLogeado(true)
    }
  }, logeado)

  return (
    <Toggable>
      <nav className="navbar navbar-expand-lg menu-bar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className='bx bx-menu'></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {
                  logeado ? <Link className="nav-link" to="/dashboard">"{user.usuarioDB.nombres}"</Link>
                    : <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                }
              </li>
              {/* <li><button onClick={props.test()}>Ola</button></li> */}
            </ul>
          </div>
        </div>
      </nav>
    </Toggable>
  );
}
export default Navbar;
