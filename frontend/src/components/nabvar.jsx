import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
const Navbar = () =>{
  const user = JSON.parse(window.localStorage.getItem('user'));

  const verficarLoggeo = () =>{
    if(user){
      return(
        <Fragment>
          <Link className="nav-link" to="/dashboard">{user.usuarioDB.nombres}</Link>
        </Fragment>
        
      );
    }else{
      return(
        <Link className="nav-link" to="/login">Iniciar Sesión</Link>
      );
    }
  }

    return(
        <nav className="navbar navbar-expand-lg menu-bar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i class='bx bx-menu'></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {verficarLoggeo()}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;
