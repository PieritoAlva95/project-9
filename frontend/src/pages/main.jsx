import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListaOfertas from '../components/listaOfertas';
import './pages.css';

const Main = ({ logeado, busqueda }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  const [ofertas, setOfertas] = useState([]);
<<<<<<< HEAD
  const [radio, setRadio] = useState('');
=======
  const [radio, setRadio] = useState("");
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635

  const cargarOfertas = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (!logeado) {
      const response = await fetch(
        'http://localhost:4000/api/oferta',
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
    }

    if (logeado) {
      const response = await fetch(
        'http://localhost:4000/api/oferta/usuario/get-ofertas/' +
          user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data);
    }
    try {
      if (busqueda.length > 0) {
        setOfertas(busqueda);
      }
    } catch (error) {
      cargarOfertas();
    }
  };

  const postularse = async (oferta) => {
    const interesado = oferta.interesados.find(
      (post) => post.postulante === user.usuarioDB.uid
    );
    if (interesado) {
      alert('Sr. usuario ya se ha postulado a esta oferta');
    } else {
      const resp = window.confirm('Desea postularse a esta oferta');
      if (resp) {
        const interesado = {
          postulante: user.usuarioDB.uid,
          nombres: user.usuarioDB.nombres + ' ' + user.usuarioDB.apellidos,
          foto: user.usuarioDB.img,
        };
        oferta.interesados.push(interesado);
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-token': user.token,
          },
          body: JSON.stringify(oferta),
        };
        const response = await fetch(
          'http://localhost:4000/api/postulante/' + oferta._id,
          requestOptions
        );
        const data = await response.json();
        if (data.ok === true) {
          alert('Su postulación se ha realizado correctamente');
          window.location.reload();
        } else {
          alert('Su postulación no pudo procesarse');
        }
      } else {
        alert('No se ha postulado');
      }
    }
  };

  const presentarListaOfertas = () => {
    if (ofertas.length > 0) {
      return ofertas.map((oferta) => (
        // <ListaOfertas key={oferta._id} oferta={oferta} logeado={logeado}></ListaOfertas>
        <div key={oferta._id} className='oferta'>
          <Link
            className='link'
            to={{ pathname: '/oferta', state: { oferta: oferta } }}
          >
            <h4>{oferta.titulo}</h4>
          </Link>
          <Link
            className='link'
            to={{ pathname: '/perfil', state: { user: oferta.usuario } }}
          >
            <h6>{oferta.nombreUsuario}</h6>
          </Link>
          <p>{oferta.cuerpo}</p>
          <span>
            <strong>Categoria:</strong> {oferta.categoria}
          </span>{' '}
          <br />
          <small>
            <strong>Salario:</strong> {oferta.precio}
          </small>{' '}
          <br />
          <small>
            <strong>Tipo de Pago:</strong> {oferta.tipoPago}
          </small>{' '}
          <br />
          {logeado ? (
            <button
              onClick={() => {
                postularse(oferta);
              }}
            >
              Postularse
            </button>
          ) : (
            ''
          )}
          <span>Ofertas: {oferta.interesados.length}</span>
        </div>
      ));
    } else {
<<<<<<< HEAD
      return <h1>No se ha encontrado información</h1>;
    }
  };

  const handleRadioSelect = (opcion) => {
    setRadio(opcion);
  };

  const buscarCategoria = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (logeado) {
      const response = await fetch(
        'http://localhost:4000/api/oferta/usuario/categoria/' +
          radio +
          '/' +
          user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
    }

    if (!logeado) {
      const response = await fetch(
        'http://localhost:4000/api/oferta/busqueda/categoria/' + radio,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
    }
  };
=======
      return (<h1>No se ha encontrado información</h1>)
    }
  }

  const handleRadioSelect = (opcion) => {
    setRadio(opcion)
  }

  const buscarCategoria = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      'http://localhost:4000/api/oferta/busqueda/categoria/' + radio,
      requestOptions
    );
    const data = await response.json();
    setOfertas(data.ofertas);
  }
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635

  useEffect(() => {
    // eslint-disable-next-line
    cargarOfertas();
    // eslint-disable-next-line
  }, [logeado]);
<<<<<<< HEAD
=======

>>>>>>> 68cf343c8151aad16293484c8501397cd569f635

  return (
    <div className='container main-section'>
      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
<<<<<<< HEAD
              <div className='listaCategoria'>
                <h3>Categorías</h3>
                <br />
                <div>
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Construcción')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
              <div className="listaCategoria">
                <h3>Categorías</h3>
                <br />
                <div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Construcción")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Albañilería / Construcción
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Trabajos Domesticos')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Trabajos Domésticos")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Trabajos Domésticos
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Carpinteria')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Carpintería")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Carpintería
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Plomeria')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Plomería")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Plomería
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Electricidad')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Electricidad")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Electricidad
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Atencion al cliente')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Atención al cliente")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Atención al cliente
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Vendedor')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Vendedor")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Vendedor/a
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() =>
                        handleRadioSelect('Servicios Informaticos')
                      }
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Servicios Informáticos")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Servicios Informáticos
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() =>
                        handleRadioSelect('Servicios Profesionales')
                      }
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Servicios Profesionales")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Servicios Profesionales
                    </label>
                  </div>

<<<<<<< HEAD
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Otros')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
=======
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Otros")} />
                    <label class="form-check-label" for="flexRadioDefault1">
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                      Otros
                    </label>
                  </div>

                  <div>
<<<<<<< HEAD
                    <button
                      className='btn btn-submit'
                      onClick={buscarCategoria}
                    >
                      Filtrar
                    </button>
                    <button
                      className='btn'
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Limpiar Filtro
                    </button>
=======
                    <button className="btn btn-submit" onClick={buscarCategoria}>Filtrar</button>
                    <button className="btn" onClick={() => { window.location.reload() }}>Limpiar Filtro</button>
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
                  </div>
                </div>
              </div>
            </div>
            <div className='col-9 listaOfertasMain'>
<<<<<<< HEAD
              {logeado ? (
                ''
              ) : (
                <p>
                  Recuerde que para poder postularse a un trabajo debe tener una
                  cuenta e iniciar sesión
                </p>
              )}
              {presentarListaOfertas()}
=======
              {
                logeado ? "" : <p>Recuerde que para poder postularse a un trabajo debe tener una cuenta e iniciar sesión</p>
              }
              {
                presentarListaOfertas()
              }
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
