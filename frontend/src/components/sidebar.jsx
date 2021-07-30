import React from 'react';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';


const Sidebar = ({setLogeado}) =>{
    const history = useHistory();

    const cerrarSesion = () => {
        localStorage.removeItem('user');
        setLogeado(false);
        history.push("/");
    }
    return(
        <div className="sidebar">
            <ul className="list-unstyled menu-items">
                <li><Link to="/dashboard"><i className="bx bxs-dashboard"></i> Dashboard</Link></li>
                <li><Link to="/dashboard/ver-perfil"><i className='bx bxs-show'></i> Ver Perfil</Link></li>
                <li><Link to="/dashboard/editar-perfil"><i className='bx bxs-user-rectangle'></i> Editar Perfil</Link></li>
                <hr />
                <li><button onClick={cerrarSesion} className="cerrar-sesion"><i className='bx bx-power-off'></i> Cerrar Sesión</button></li>
            </ul>
        </div>
    );
}

export default Sidebar