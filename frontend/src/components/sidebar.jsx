import React from 'react';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';


const Sidebar = () =>{
    const history = useHistory();

    const cerrarSesion = () => {
        localStorage.removeItem('user');
        history.push("/");
    }
    return(
        <div className="sidebar">
            <ul class="list-unstyled menu-items">
                <li><Link to="#"><i class="bx bxs-dashboard"></i> Dashboard</Link></li>
                <hr />
                <li><button onClick={cerrarSesion} className="cerrar-sesion"><i class='bx bx-power-off'></i> Cerrar Sesión</button></li>
            </ul>
        </div>
    );
}

export default Sidebar