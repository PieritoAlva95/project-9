import React, { Fragment, useState, useEffect } from 'react';
import AñadirOferta from '../components/añadirOferta';
import TablaOfertas from '../components/tablaOfertas';
import Sidebar from '../components/sidebar'

const Dashboard = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    let lista = [];
    const [listaOfertas, setListaOfertas] = useState([]);

    const crearOferta = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:4000/api/oferta', requestOptions);
        const dataREs = await response.json();
        console.log(dataREs);
        cargarOfertasByUser()
    }

    const cargarOfertasByUser = async () => {
        console.log(user);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('http://localhost:4000/api/oferta/usuario/' + user.usuarioDB.uid, requestOptions);
        const data = await response.json();
        setListaOfertas(data)
        lista.push(data);
        console.log(data);
    }
    useEffect(()=>{
        cargarOfertasByUser()
    }, [])


    return (
        <Fragment>
            <Sidebar></Sidebar>
            <div className="container-fluid main-dashboard">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-10">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Añadir
                        </button>
                        <div className="main-tabla">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listaOfertas.map(oferta => (
                                            <TablaOfertas key={oferta._id} oferta={oferta} metodoCargarDatos = {cargarOfertasByUser}></TablaOfertas>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <AñadirOferta metodoCrearOferta={crearOferta}></AñadirOferta>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Dashboard;