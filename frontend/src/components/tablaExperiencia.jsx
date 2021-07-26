import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import ConfirmarEliminar from './modales/confirmarEliminar';


const TabalaExperiencia = ({ experiencia, user }) => {
    const eliminar = () => {
        var response = window.confirm("Esta seguro de eliminar su experiencia?");
        if (response == true) {
            alert(experiencia.titulo);
        }else{
            alert("bad");
        }
    }
    return (
        <Fragment>
            <tr key={experiencia._id}>
                <th scope="row">{experiencia.titulo}</th>
                <td>{experiencia.descripcion}</td>
                <td>{experiencia.fechaInicio}</td>
                <td>{experiencia.fechaFin}</td>
                <td><Link className="btnLink" to={{
                    pathname: "/dashboard/perfil/experiencia", state: { experiencia: experiencia }
                }}><i className='bx bx-edit'></i></Link>
                    {/* <button type="button" className="btnDelete" data-bs-toggle="modal" data-bs-target="#eliminar">
                        <i className='bx bx-trash'></i>
                    </button></td> */}
                    <button type="button" className="btnDelete" onClick={eliminar}>
                        <i className='bx bx-trash'></i>
                    </button></td>
            </tr>

            <ConfirmarEliminar data={experiencia} />
        </Fragment>
    );
}

export default TabalaExperiencia;