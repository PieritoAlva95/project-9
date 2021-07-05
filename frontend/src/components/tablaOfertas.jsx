import React, { Fragment } from 'react';

const TablaOfertas = ({oferta}) =>{

    return(
            <tr>
                <td>{oferta.titulo}</td>
                <td>{oferta.cuerpo}</td>
                <td><button>Editar</button></td>
            </tr>
    );
}

export default TablaOfertas