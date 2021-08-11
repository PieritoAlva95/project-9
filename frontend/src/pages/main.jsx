import React, { useState, useEffect } from 'react';
import ListaOfertas from '../components/listaOfertas';
import './pages.css';

const Main = ({ logeado, busqueda }) => {
  const [ofertas, setOfertas] = useState([]);
  const [radio, setRadio] = useState("");

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
      const user = JSON.parse(window.localStorage.getItem('user'));
      const response = await fetch(
        'http://localhost:4000/api/oferta/usuario/get-ofertas/' + user.usuarioDB.uid,
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



  const presentarListaOfertas = () => {
    if (ofertas.length > 0) {
      return (
        ofertas.map((oferta) => (
          <ListaOfertas key={oferta._id} oferta={oferta} logeado={logeado}></ListaOfertas>
        ))
      )
    } else {
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

  useEffect(() => {
    // eslint-disable-next-line
    cargarOfertas();
    // eslint-disable-next-line
  }, [logeado]);


  return (
    <div className='container main-section'>
      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
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
                      Albañilería / Construcción
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Trabajos Domésticos")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Trabajos Domésticos
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Carpintería")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Carpintería
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Plomería")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Plomería
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Electricidad")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Electricidad
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Atención al cliente")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Atención al cliente
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Vendedor")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Vendedor/a
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Servicios Informáticos")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Servicios Informáticos
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Servicios Profesionales")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Servicios Profesionales
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => handleRadioSelect("Otros")} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Otros
                    </label>
                  </div>

                  <div>
                    <button className="btn btn-submit" onClick={buscarCategoria}>Filtrar</button>
                    <button className="btn" onClick={() => { window.location.reload() }}>Limpiar Filtro</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-9 listaOfertasMain'>
              {
                logeado ? "" : <p>Recuerde que para poder postularse a un trabajo debe tener una cuenta e iniciar sesión</p>
              }
              {
                presentarListaOfertas()
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
