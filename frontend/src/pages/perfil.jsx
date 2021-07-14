import React, { useState, useEffect } from 'react';

const Perfil = ({ location }) => {
  const userID = location.state.user.uid;
  const imgURL = 'http://localhost:4000/uploads/';
  const [user, setUser] = useState({
    img: '',
    esAdmin: '',
    fechaCreacion: '',
    nombres: '',
    apellidos: '',
    documentoDeIdentidad: '',
    numeroDeCelular: '',
    email: '',
    uid: '',
  });

  const cargarUsuario = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      'http://localhost:4000/api/usuarios/' + userID,
      requestOptions
    );
    const data = await response.json();
    setUser(data);
  };
  useEffect(cargarUsuario, [userID]);
  return (
    <div className='container main-perfil'>
      <div className='perfil'>
        <img src={imgURL + user.img} alt='' />
        <h1>
          Perfil de {user.nombres} {user.apellidos}
        </h1>
        <p>{user.email}</p>
        <span>{user.numeroDeCelular}</span>
      </div>
    </div>
  );
};

export default Perfil;
