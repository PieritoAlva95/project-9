import React, { useState, useEffect } from 'react';
import ListaOfertas from '../components/listaOfertas';
import './pages.css';

const Main = () => {
    const [ofertas, setOfertas] = useState([]);
    
    const cargarOfertas = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('http://localhost:4000/api/oferta', requestOptions);
        const data = await response.json();
        setOfertas(data.ofertas)
        console.log(data.ofertas);
    }
    useEffect(() => {
        cargarOfertas();
    }, []);

    // console.log(ofertas);

    const presentarOfertas = () =>{
        return(
            ofertas.map(oferta => (
                <ListaOfertas key={oferta._id} oferta={oferta}></ListaOfertas>
            ))
        );
    }
    return (
        <div className="container main-section">
            <div className="row">
            {presentarOfertas()}
            </div>
        </div>
    );
}
export default Main;