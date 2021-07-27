import React, { Fragment } from 'react'

const TablaContratos = ({ oferta, finalizarContrato }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    const finalizar = () => {
        var response = window.confirm("Esta seguro de finalizar el contrato?");
        if (response == true) {
            oferta.disponible = "contrato finalizado";
            finalizarContrato(oferta);
        } else {
            alert("Su contrato no ha sido finalizado");
        }
    }
    return (
        <Fragment>
            <tr key={oferta._id}>
                <td>{oferta.titulo}</td>
                {
                    oferta.interesados.map((user) => (
                        user.aceptado ? <td>{user.nombres}</td> : ''
                    ))
                }
                <td>{oferta.cuerpo}</td>
                <td>{oferta.precio}</td>
                <td><button type="button" className="buttonDelete" onClick={finalizar}>Finalizar Contrato</button></td>
            </tr>
        </Fragment>
    );
}

export default TablaContratos;