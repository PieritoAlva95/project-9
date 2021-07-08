import React, { Fragment } from 'react';
import EditarOferta from './editOferta'
import { Link } from 'react-router-dom';


const TablaOfertas = ({ oferta, metodoCargarDatos }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));


    const eliminarOferta = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token
            }
        };
        const response = await fetch('http://localhost:4000/api/oferta/'+oferta._id, requestOptions);
        const data = await response.json();
        console.log(data);
        metodoCargarDatos()
        // alert(oferta._id)
    }

    return (
        <Fragment>
            <tr>
                <td>{oferta.titulo}</td>
                <td>{oferta.cuerpo}</td>
                <td>
                    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                        <i class='bx bx-edit'></i>
                    </button> */}
                    <Link to={{pathname:"/dashboard/editar-oferta", state:{oft:oferta} }}><i class='bx bx-edit'></i></Link>
                    <button type="button" class="btn btn-primary" onClick={eliminarOferta}>
                        <i class='bx bx-trash'></i>
                    </button>
                </td>
            </tr>
        </Fragment>
    );
}

export default TablaOfertas