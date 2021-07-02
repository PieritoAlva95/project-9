import React, {useEffect, useState} from 'react';

const Perfil = () =>{
    const [user, setuser] = useState({});
    
    useEffect(() => {
        const usuariosLoggin = window.localStorage.getItem('user');
        if(usuariosLoggin){
            const user = JSON.parse(usuariosLoggin);
            setuser(user);
            console.log(user);
        }        
    }, [])
    return(
        <div className="container main-perfil">
            <h1>Perfil de {user.usuarioDB.nombres} </h1>
        </div>
    );
}

export default Perfil;