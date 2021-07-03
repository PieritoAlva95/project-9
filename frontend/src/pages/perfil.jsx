import React from 'react';

const Perfil = () =>{
    const user = JSON.parse(window.localStorage.getItem('user'));
    
    return(
        <div className="container main-perfil">
            <h1>Perfil de {user.usuarioDB.nombres} </h1>
        </div>
    );
}

export default Perfil;