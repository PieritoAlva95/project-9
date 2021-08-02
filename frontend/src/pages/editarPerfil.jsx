import React, { Fragment, useEffect, useState } from 'react';
import AddEstudios from '../components/modales/addEstudios';
import AddExperiencia from '../components/modales/addExperiencia';
import AddSkill from '../components/modales/addSkill';
import Sidebar from '../components/sidebar';
import { Link } from 'react-router-dom';
import TablaEstudios from '../components/tablaEstudios';
import TabalaExperiencia from '../components/tablaExperiencia';

const EditarPerfil = ({ setLogeado }) => {
  const imgURL = 'http://localhost:4000/uploads/';
  const user = JSON.parse(window.localStorage.getItem('user'));

  const [usuario, setUsuario] = useState({});
  const [password, setPassword] = useState({
    password: "",
    password2: ""
  });

  const [redesSociales, setRedesSociales] = useState({
    facebook: user.usuarioDB.redesSociales.facebook,
    twitter: user.usuarioDB.redesSociales.twitter,
    instagram: user.usuarioDB.redesSociales.instagram,
    linkedin: user.usuarioDB.redesSociales.linkedin,
  });

  const [datos, setDatos] = useState({
    nombres: user.usuarioDB.nombres,
    apellidos: user.usuarioDB.apellidos,
    numeroDeCelular: user.usuarioDB.numeroDeCelular,
    email: user.usuarioDB.email,
    bio: user.usuarioDB.bio
  });

  const handleInputChangeData = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  }

  const handleSubmitData = (e) => {
    e.preventDefault();
    if (user.usuarioDB.email != datos.email) {
      alert("Si modifica su correo electrónico, se cerrara su sesión automáticamente y deberá ingresar nuevamente con su nuevo correo")
    }
    user.usuarioDB.nombres = datos.nombres;
    user.usuarioDB.apellidos = datos.apellidos;
    user.usuarioDB.numeroDeCelular = datos.numeroDeCelular;
    user.usuarioDB.email = datos.email;
    user.usuarioDB.bio = datos.bio;

    editarUser(user);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRedesSociales({ ...redesSociales, [name]: value });
  };

  const handleInputChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    user.usuarioDB.redesSociales = redesSociales;
    console.log(user.usuarioDB.redesSociales);
    editarUser(user);
  };

  const cambiarPassword = () => {
    if (password.password === "" || password.password2 === "") {
      alert("Se deben llenar los campos");
    } else {
      if (password.password === password.password2) {
        user.usuarioDB.password = password.password;
        passwordChange(user)
      } else {
        alert("Las contraseñas no son iguales");
      }
    }
  }

  const editarUser = async (useredit) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': useredit.token,
      },
      body: JSON.stringify(useredit.usuarioDB),
    };
    const response = await fetch(
      'http://localhost:4000/api/usuarios/' + useredit.usuarioDB.uid,
      requestOptions
    );
    const data = await response.json();
    window.localStorage.setItem('user', JSON.stringify(data));
    const user = JSON.parse(window.localStorage.getItem('user'));
    setUsuario(user);
    cargarSkills();
    alert("Sus cambios se han guardado satisfactoriamente");
    // console.log(oft.titulo);
  };

  const passwordChange = async (useredit) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': useredit.token,
      },
      body: JSON.stringify(useredit.usuarioDB),
    };
    const response = await fetch(
      'http://localhost:4000/api/usuarios/cambio/' + useredit.usuarioDB.uid,
      requestOptions
    );
    const data = await response.json();
    user.usuarioDB = data.usuarioDB;
    setUsuario(user);
    cargarSkills();
    alert("Sus cambios se han guardado satisfactoriamente");
    // console.log(oft.titulo);
  };

  const eliminarSkill = (skill) => {
    var response = window.confirm("Esta seguro de eliminar la habilidad");
    if (response == true) {
      const habilidad = user.usuarioDB.skills.indexOf(skill);
      user.usuarioDB.skills.splice(habilidad, 1);
      editarUser(user);
    } else {
      alert("La información no ha sido eliminada");
    }

  }

  const cargarSkills = () => {
    return user.usuarioDB.skills.map((skill) =>
      <div className="habilidad">
        {skill} <button type="button" onClick={() => eliminarSkill(skill)} className="btnDelete"><i className='bx bx-trash'></i></button>
      </div>);
  };

  useEffect(() => {
    cargarSkills();
  }, [usuario]);

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado} />
      <div className='container main-editar-perfil'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-10'>
            <div className='container'>
              <div className='row'>
                <div className='img-perfil'>
                  <img src={imgURL + user.usuarioDB.img} alt='' />
                  <br />
                  <input type='file' name='imf-perfil' id='img-perfil' />
                </div>
              </div>
            </div>
            <hr />
            <div className="col-12 datosGenerales">
              <h1>Datos Generales</h1>
              <form className='datos-generales' onSubmit={handleSubmitData}>
                <div className='form-group'>
                  <label>Nombres</label>
                  <input
                    type='text'
                    className='txtSocial'
                    name='nombres'
                    defaultValue={datos.nombres}
                    id='nombres'
                    onChange={handleInputChangeData}
                  />
                </div>
                <div className='form-group'>
                  <label>Apellidos</label>
                  <input
                    type='text'
                    className='txtSocial'
                    name='apellidos'
                    defaultValue={datos.apellidos}
                    id='apellidos'
                    onChange={handleInputChangeData}
                  />
                </div>
                <div className='form-group'>
                  <label>Telefono</label>
                  <input
                    type='text'
                    className='txtSocial'
                    name='numeroDeCelular'
                    defaultValue={datos.numeroDeCelular}
                    id='numeroDeCelular'
                    onChange={handleInputChangeData}
                  />
                </div>
                <div className='form-group'>
                  <label>Correo</label>
                  <input
                    type='text'
                    className='txtSocial'
                    name='email'
                    defaultValue={datos.email}
                    id='email'
                    onChange={handleInputChangeData}
                  />
                </div>
                <div className='form-group'>
                  <label>Biografia</label>
                  <textarea
                    type='text'
                    className='txtSocial'
                    name='bio'
                    defaultValue={datos.bio}
                    id='bio'
                    onChange={handleInputChangeData}
                  ></textarea>
                </div>
                <button className='btn-submit'>
                  <i class='bx bxs-save'></i> Guardar Cambios
                </button>
              </form>
              <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#cambiarPassword">Cambiar Contraseña</button>
              <div class="modal fade" id="cambiarPassword" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Cambiar Contraseña</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" onChange={handleInputChangePassword} />
                      </div>
                      <div>
                        <label htmlFor="password2">Repita la Contraseña</label>
                        <input type="password" name="password2" id="password2" onChange={handleInputChangePassword} />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={cambiarPassword}>Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='col-lg-12 habilidades'>
              <h1>Habilidades</h1>
              <button
                className='btn-submit'
                data-bs-toggle='modal'
                data-bs-target='#addSkill'
              >
                <i className='bx bx-plus-medical'></i>
              </button>
              <div>{cargarSkills()}</div>
            </div>
            <hr />
            <div className='col-lg-12 experiencia'>
              <h1>Experiencia</h1>
              <Link
                className='btnLink'
                to={{
                  pathname: '/dashboard/perfil/experiencia',
                  state: { experiencia: {} },
                }}
              >
                <i className='bx bx-plus-medical'></i>
              </Link>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Titulo</th>
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Fecha inicio</th>
                    <th scope='col'>Fecha fin</th>
                    <th scope='col'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {user.usuarioDB.experiencia.map((exp) => (
                    <TabalaExperiencia experiencia={exp} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
            <hr />
            <div className='col-lg-12 estudios'>
              <h1>Estudios</h1>
              <Link
                className='btnLink'
                to={{
                  pathname: '/dashboard/perfil/estudios',
                  state: { estudio: {} },
                }}
              >
                <i className='bx bx-plus-medical'></i>
              </Link>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Titulo</th>
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Fecha inicio</th>
                    <th scope='col'>Fecha fin</th>
                    <th scope='col'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {user.usuarioDB.estudios.map((estudio) => (
                    <TablaEstudios estudio={estudio} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
            <hr />
            <div className='col-lg-12 redesSociales'>
              <h1>REDES SOCIALES</h1>
              <small>Recuerde ingresar el link de su perfil!</small>
              <form className='redes-sociales' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <i class='bx bxl-facebook-square'></i>
                  <input
                    type='text'
                    className='txtSocial'
                    name='facebook'
                    defaultValue={user.usuarioDB.redesSociales.facebook}
                    id='facebook'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group'>
                  <i class='bx bxl-twitter'></i>
                  <input
                    type='text'
                    className='txtSocial'
                    name='twitter'
                    defaultValue={user.usuarioDB.redesSociales.twitter}
                    id='twitter'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group'>
                  <i class='bx bxl-instagram'></i>
                  <input
                    type='text'
                    className='txtSocial'
                    name='instagram'
                    defaultValue={user.usuarioDB.redesSociales.instagram}
                    id='instagram'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group'>
                  <i class='bx bxl-linkedin-square'></i>
                  <input
                    type='text'
                    className='txtSocial'
                    name='linkedin'
                    defaultValue={user.usuarioDB.redesSociales.linkedin}
                    id='linkedin'
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button className='btn-submit'>
                    <i class='bx bxs-save'></i> Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AddSkill editarUser={editarUser} user={user} />
    </Fragment>
  );
};

export default EditarPerfil;
