import React, { Fragment, useEffect, useState } from 'react'

const DashboardAdmin = ({ setLogeado }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
    const [usuarios, setUsuarios] = useState([])
    const imgURL = "http://localhost:4000/uploads/";
    const getUsuarios = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            'http://localhost:4000/api/usuarios/obtener/usuarios',
            requestOptions
        );
        const data = await response.json();
        setUsuarios(data);
    }

    const editarUser = async (useredit) => {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-token': user.token,
          },
          body: JSON.stringify(useredit),
        };
        const response = await fetch(
          'http://localhost:4000/api/usuarios/' + useredit.uid,
          requestOptions
        );
        const data = await response.json();
        window.localStorage.setItem('user', JSON.stringify(data));
        alert("Sus cambios se han guardado satisfactoriamente");
        getUsuarios();
      };

    const desactivar = (user) => {
        user.activo = false;
        editarUser(user);
    }

    const activar = (user) => {
        user.activo = true;
        editarUser(user);
    }

    useEffect(() => {
        getUsuarios();
    }, [])
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <div className="container main-admin">
                            <div className="row">
                                <div className="col-12">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Imagen</th>
                                                <th scope='col'>Nombres</th>
                                                <th scope='col'>Email</th>
                                                <th scope='col'>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usuarios.map((user) =>(
                                                    <tr>
                                                        <td scope='col'><img className="img-table" src={imgURL+user.img} /></td>
                                                        <td scope='col'>{user.nombres} {user.apellidos}</td>
                                                        <td scope='col'>{user.email}</td>
                                                        <td>{
                                                                user.activo ? <button className="btn-submit" onClick={() => desactivar(user)}>Desactivar</button> : 
                                                                <button className="btn-submit" onClick={() => activar(user)}>Activar</button>
                                                            }</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardAdmin;