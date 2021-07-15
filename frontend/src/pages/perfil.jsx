import React, { useState, useEffect } from 'react';

const Perfil = ({ location }) => {
    const userID = location.state.user;
    const imgURL = "http://localhost:4000/uploads/";
    const [user, setUser] = useState({
        img: '',
        esAdmin: '',
        fechaCreacion: '',
        nombres: '',
        apellidos: '',
        documentoDeIdentidad: '',
        numeroDeCelular: '',
        email: '',
        skills: [],
        redesSociales: [{
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
        }],
        experiencia: [{
            titulo: '',
            empresa: '',
            fechaInicio: '',
            fechaFin: '',
            descripcion: ''
        }],
        estudios: [{
            nombreInstitucion: '',
            titulo: '',
            fechaInicio: '',
            fechaFin: '',
            descripcion: ''
        }],
        uid: ''
    })

    const cargarUsuario = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('http://localhost:4000/api/usuarios/' + userID, requestOptions);
        const data = await response.json();
        setUser(data);
        console.log(data);
    }

    useEffect(cargarUsuario, []);
    return (
        <div className="container main-perfil">
            <div className="perfil">
                <img src={imgURL + user.img} alt="" />
                <h1>Perfil de {user.nombres} {user.apellidos}</h1>
                <p>{user.email}</p>
                <span>{user.numeroDeCelular}</span>
                <div className="redes-sociales">
                    {
                        user.redesSociales[0].facebook ?
                            <a href={user.redesSociales[0].facebook} target="_blank"><i class='bx bxl-facebook-square' ></i></a>
                            :
                            <span></span>
                    }
                    {
                        user.redesSociales[0].instagram ?
                            <a href={user.redesSociales[0].instagram} target="_blank"><i class='bx bxl-instagram' ></i></a>
                            :
                            <span></span>
                    }
                    {
                        user.redesSociales[0].twitter ?
                            <a href={user.redesSociales[0].twitter} target="_blank"><i class='bx bxl-twitter' ></i></a>
                            :
                            <span></span>
                    }
                    {
                        user.redesSociales[0].linkedin ?
                            <a href={user.redesSociales[0].linkedin} target="_blank"><i class='bx bxl-linkedin-square' ></i></a>
                            :
                            <span></span>
                    }
                </div>
                <div className="skills">
                    {
                        user.skills.map(skill => (
                            <span><i class='bx bxs-check-square' ></i> {skill}</span>
                        ))
                    }
                </div>
                <div className="row informacion">
                    <div className="col-lg-6 experiencia">
                        {
                            user.experiencia.map(exp => (
                                <div className="data" key={exp._id}>
                                    <h5>{exp.titulo}</h5>
                                    <small>{exp.fechaInicio} | {exp.fechaFin}</small>
                                    <h6>{exp.empresa}</h6>
                                    <p>{exp.descripcion}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-lg-6 estudios">
                    {
                            user.estudios.map(estudio => (
                                <div className="data" key={estudio._id}>
                                    <h5>{estudio.titulo}</h5>
                                    <small>{estudio.fechaInicio} | {estudio.fechaFin}</small>
                                    <h6>{estudio.nombreInstitucion}</h6>
                                    <p>{estudio.descripcion}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
  };

export default Perfil;
