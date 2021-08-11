import React, { Fragment, useEffect, useState } from 'react';
import AddSkill from '../components/modales/addSkill';
import Sidebar from '../components/sidebar';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TablaEstudios from '../components/tablaEstudios';
import TabalaExperiencia from '../components/tablaExperiencia';

const EditarPerfil = ({ setLogeado, cargar }) => {
  const imgURL = 'http://localhost:4000/uploads/';
  const user = JSON.parse(window.localStorage.getItem('user'));
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [password, setPassword] = useState({
    password: "",
    password2: "",
    passwordActual: ""
  });

  const experiencia = {
    _id: "asdasd",
    titulo: "",
    empresa: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: ""
  }

  // if (!user) {
  //   history.push('/');
  // }

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
    if (user.usuarioDB.email !== datos.email) {
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
    editarUser(user);
  };

  const cambiarPassword = () => {
    if (password.password === "" || password.password2 === "" || password.passwordActual === "") {
      alert("Se deben llenar los campos");
    } else {
      if (password.password === password.password2) {
        if (password.password.length >= 6 && password.password2.length >= 6) {
          user.usuarioDB.password = password.password;
          passwordChange(user)
        } else {
          alert("Las contraseñas no pueden tener menos de 6 caracteres");
          window.location.reload();
        }
      } else {
        alert("Las contraseñas no son iguales");
        window.location.reload();
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
    if (data.ok) {
      window.localStorage.setItem('user', JSON.stringify(data));
      const user = JSON.parse(window.localStorage.getItem('user', data));
      setUsuario(user);
      cargarSkills();
      alert("Sus cambios se han guardado satisfactoriamente");
      presentarExperiencia();
      presentarEstudios();
    } else {
      alert("No se realizarón los cambios");
    }
    // console.log(oft.titulo);
  };

  const passwordChange = async (useredit) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': useredit.token,
      },
      body: JSON.stringify(password),
    };
    const response = await fetch(
      'http://localhost:4000/api/usuarios/cambio/' + useredit.usuarioDB.uid,
      requestOptions
    );
    const data = await response.json();
    alert(data.msg);
    if (data.ok) {
      alert("Su sesión se cerrará");
      localStorage.removeItem('user');
      history.push("/login");
    }else{
      window.location.reload();
    }
  };

  const eliminarSkill = (skill) => {
    var response = window.confirm("Esta seguro de eliminar la habilidad");
    if (response === true) {
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

  const cambiarImagen = async (files) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'x-token': user.token
      },
      body: files
    };
    const response = await fetch('http://localhost:4000/api/upload/usuarios/' + user.usuarioDB.uid, requestOptions);
    const data = await response.json();
    user.usuarioDB.img = data.nombreArchivo;
    window.localStorage.setItem('user', JSON.stringify(user));
    window.location.reload();
  }

  const handleFileInput = (e) => {
    var files = new FormData();
    files.append("imagen", e.target.files[0]);
    var response = window.confirm("Esta seguro de cambiar su imagen de perfil?");
    if (response) {
      cambiarImagen(files);
    } else {
      alert("su imagen de perfil no ha cambiado");
    }
  }

  const presentarExperiencia = () => {
    return (
      user.usuarioDB.experiencia.map((exp) => (
        <TabalaExperiencia experiencia={exp} user={user} editarUser={editarUser} cargar={presentarExperiencia} />
      ))
    );
  }

  const presentarEstudios = () => {
    return (
      user.usuarioDB.estudios.map((estudio) => (
        <TablaEstudios estudio={estudio} user={user} editarUser={editarUser} />
      ))
    );
  }

  if (cargar) {
    window.location.reload();
  }

  useEffect(() => {
    cargarSkills();
    presentarExperiencia();
    // eslint-disable-next-line
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
                  <input type='file' name='imf-perfil' id='img-perfil' onChange={handleFileInput} />
                </div>
              </div>
            </div>
            <hr />
            <div className="col-12 datosGenerales">
              <h1>Datos Generales</h1>
              <form className='datos-generales' onSubmit={handleSubmitData}>
                <div className="row">
                  <div className="col-6">
                    <div className='form-group mb-3'>
                      <label htmlFor="txtNombres" className="form-label">Nombres</label>
                      <input
                        type='text'
                        className='txtSocial form-control'
                        id="txtNombres"
                        name='nombres'
                        defaultValue={datos.nombres}
                        // eslint-disable-next-line
                        id='nombres'
                        // eslint-disable-next-line
                        onChange={handleInputChangeData}
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor="txtApellidos" className="form-label">Apellidos</label>
                      <input
                        type='text'
                        className='txtSocial form-control'
                        name='apellidos'
                        // eslint-disable-next-line
                        id="txtApellidos"
                        defaultValue={datos.apellidos}
                        // eslint-disable-next-line
                        id='apellidos'
                        onChange={handleInputChangeData}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className='form-group mb-3'>
                      <label htmlFor="txtTelefono" className="form-label">Telefono</label>
                      <input
                        type='text'
                        className='txtSocial form-control'
                        id="txtTelefono"
                        name='numeroDeCelular'
                        defaultValue={datos.numeroDeCelular}
                        // eslint-disable-next-line
                        id='numeroDeCelular'
                        onChange={handleInputChangeData}
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor="txtCorreo" className="form-label">Correo</label>
                      <input
                        type='text'
                        className='txtSocial form-control'
                        id="txtCorreo"
                        name='email'
                        defaultValue={datos.email}
                        // eslint-disable-next-line
                        id='email'
                        onChange={handleInputChangeData}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className='form-group mb-3'>
                      <label htmlFor="txtBio" className="form-label">Biografia</label>
                      <textarea
                        type='text'
                        className='txtSocial form-control'
                        id="txtBio"
                        name='bio'
                        defaultValue={datos.bio}
                        // eslint-disable-next-line
                        id='bio'
                        onChange={handleInputChangeData}
                      ></textarea>
                    </div>
                    <button className='btn-submit'>
                      <i className='bx bxs-save'></i> Guardar Datos Generales
                    </button>
                  </div>
                  <div className="col-6">
                    <br />
                    <span className="spanPass" data-bs-toggle="modal" data-bs-target="#cambiarPassword"><i className='bx bxs-key'></i> Cambiar Contraseña</span>
                  </div>
                </div>
              </form>
              <div className="modal fade" id="cambiarPassword" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Cambiar Contraseña</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="passwordActual" className="form-label">Contraseña Actual</label>
                        <input type="password" className="form-control" name="passwordActual" id="passwordActual" onChange={handleInputChangePassword} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={handleInputChangePassword} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Repita la Contraseña</label>
                        <input type="password" name="password2" className="form-control" id="password2" onChange={handleInputChangePassword} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={cambiarPassword}>Guardar</button>
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
                  state: { experiencia: experiencia },
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
                  {presentarExperiencia()}
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
                  {presentarEstudios()}
                </tbody>
              </table>
            </div>
            <hr />
            <div className='col-lg-12 redesSociales'>
              <h1>REDES SOCIALES</h1>
              <small>Recuerde ingresar el link de su perfil!</small>
              <form className='redes-sociales' onSubmit={handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <div className='form-group mb-3'>
                        <label htmlFor="txtSocial" className="form-label">
                          <i className='bx bxl-facebook-square'></i> Facebook</label>
                        <input
                          type='text'
                          className='txtSocial form-control'
                          name='facebook'
                          defaultValue={user.usuarioDB.redesSociales.facebook}
                          id='facebook'
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='form-group mb-3'>
                        <label htmlFor="txtTwitter" className="form-label">
                          <i className='bx bxl-twitter'></i> Twitter</label>
                        <input
                          type='text'
                          className='txtSocial form-control'
                          name='twitter'
                          defaultValue={user.usuarioDB.redesSociales.twitter}
                          id='twitter'
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className='form-group mb-3'>
                        <label htmlFor="txtTwitter" className="form-label">
                          <i className='bx bxl-instagram'></i> Instagram</label>
                        <input
                          type='text'
                          className='txtSocial form-control'
                          name='instagram'
                          defaultValue={user.usuarioDB.redesSociales.instagram}
                          id='instagram'
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor="txtTwitter" className="form-label">
                          <i className='bx bxl-linkedin'></i> Linkedin</label>
                        <input
                          type='text'
                          className='txtSocial form-control'
                          name='linkedin'
                          defaultValue={user.usuarioDB.redesSociales.linkedin}
                          id='linkedin'
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className='btn-submit'>
                    <i className='bx bxs-save'></i> Guardar Redes Sociales
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
