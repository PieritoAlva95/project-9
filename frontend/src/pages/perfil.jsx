import React, { useState, useEffect, Fragment } from 'react';

const Perfil = ({ location }) => {
    const linkwhatsapp = "https://web.whatsapp.com/send?phone=593";
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
        redesSociales: {
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
        },
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
        <Fragment>
            <div className="container main-perfil">
                <div className="perfil">
                    <img src={imgURL + user.img} alt="" />
                    <h1>{user.nombres} {user.apellidos}</h1>
                    <p>{user.email}</p>
                    <span className="telefono">{user.numeroDeCelular} </span>
                    <a className="contactame" href={linkwhatsapp + user.numeroDeCelular} target="_blank">Contactame!</a>
                    <div className="redes-sociales">
                        {
                            user.redesSociales.facebook ?
                                <a href={user.redesSociales.facebook} target="_blank"><i class='bx bxl-facebook-square' ></i></a>
                                :
                                <span></span>
                        }
                        {
                            user.redesSociales.instagram ?
                                <a href={user.redesSociales.instagram} target="_blank"><i class='bx bxl-instagram' ></i></a>
                                :
                                <span></span>
                        }
                        {
                            user.redesSociales.twitter ?
                                <a href={user.redesSociales.twitter} target="_blank"><i class='bx bxl-twitter' ></i></a>
                                :
                                <span></span>
                        }
                        {
                            user.redesSociales.linkedin ?
                                <a href={user.redesSociales.linkedin} target="_blank"><i class='bx bxl-linkedin-square' ></i></a>
                                :
                                <span></span>
                        }
                    </div>
                    <div className="skills">
                        <h2>HABILIDADES</h2>
                        {
                            user.skills.map(skill => (
                                <span className="habilidad"><i class='bx bxs-check-square' ></i> {skill}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row informacion">
                    <div className="col-lg-6 experiencia-perfil">
                        <div className="marco">
                            <h1>EXPERIENCIA</h1>
                            {
                                user.experiencia.map(exp => (
                                    <div key={exp._id}>
                                        <h5>{exp.titulo}</h5>
                                        <small>{exp.fechaInicio} | {exp.fechaFin}</small>
                                        <h6>{exp.empresa}</h6>
                                        <p>{exp.descripcion}</p>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-lg-6 estudios-perfil">
                        <div className="marco">
                        <h1>ESTUDIOS</h1>
                        {
                            user.estudios.map(estudio => (
                                <div key={estudio._id}>
                                    <h5>{estudio.titulo}</h5>
                                    <small>{estudio.fechaInicio} | {estudio.fechaFin}</small>
                                    <h6>{estudio.nombreInstitucion}</h6>
                                    <p>{estudio.descripcion}</p>
                                    <hr />
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Perfil;
