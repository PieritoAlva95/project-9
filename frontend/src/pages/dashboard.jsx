import React, { Fragment, useState, useEffect } from 'react';
import AñadirOferta from '../components/añadirOferta';
import TablaOfertas from '../components/tablaOfertas';
import Sidebar from '../components/sidebar';
import { useHistory, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
const { SearchBar, ClearSearchButton } = Search;


const Dashboard = ({ setLogeado }) => {
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log(user);
  if (user == null) {
    history.push('/');
  }

  const estiloBtnDelete = {
    backgroundColor: "#ff6b6b",
    color: "#fafafa",
    borderStyle: "none"
  };

  const columns = [
    {
      dataField: 'titulo',
      text: 'Titulo'
    },
    {
      dataField: 'cuerpo',
      text: 'Descripción'
    },
    {
      dataField: 'precio',
      text: 'Precio'
    },
    {
      dataField: 'tipoPago',
      text: 'Tipo Pago'
    },
    {
      dataField: "",
      text: 'Acción',
      formatter: (cellContent, row) => {
        return (
          // <p>{row.precio}</p>
          <Fragment>
            <Link className="btnLink" to={{ pathname: "/dashboard/visualizar-oferta", state: { oft: row } }}><i className='bx bxs-show'></i></Link>
            <Link className="btnLink" to={{ pathname: "/dashboard/editar-oferta", state: { oft: row } }}><i className='bx bx-edit'></i></Link>
            <button type="button" className="btnDelete" onClick={() => eliminar(row)}>
              <i className='bx bx-trash delete'></i>
            </button>
          </Fragment>
        );
      }
    }
  ];

  const eliminar = async(oferta) => {
    var response = window.confirm("Esta seguro de eliminar la oferta de trabajo");
    if (response) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-token': user.token
        }
      };
      const response = await fetch('http://localhost:4000/api/oferta/' + oferta._id, requestOptions);
      const data = await response.json();
      cargarOfertasByUser()
    }
  }

  const selectedRow = (row, isSelect, rowIndex) => {
    this.setState(curr => ({ ...curr, selectedRow: row }));
    console.log(row);
  };

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    onselect: selectedRow
  };

  let lista = [];
  const [listaOfertas, setListaOfertas] = useState([]);

  const crearOferta = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      'http://localhost:4000/api/oferta',
      requestOptions
    );
    const dataREs = await response.json();
    alert("Su Oferta ha sido creada exitosamente");
    cargarOfertasByUser();
  };

  const cargarOfertasByUser = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        'http://localhost:4000/api/oferta/usuario/' + user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      setListaOfertas(data);

      lista.push(data);
    }
  };


  useEffect(() => {
    cargarOfertasByUser()
  }, []);

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado}></Sidebar>
      <div className='container-fluid main-dashboard'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-10'>
            <h2>Tus Ofertas</h2>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop'
            >
              Añadir
            </button>
            <div className='main-tabla'>
              <ToolkitProvider keyField='id'
                data={listaOfertas}
                columns={columns}
                search
              >
                {
                  props => (
                    <div>
                      <SearchBar {...props.searchProps} />
                      <ClearSearchButton {...props.searchProps} />
                      <hr />
                      <BootstrapTable
                        {...props.baseProps}
                        // ref={ n => this.node = n }
                        selectRow={selectRow}
                        pagination={ paginationFactory() }
                      />

                    </div>
                  )
                }
              </ToolkitProvider>
            </div>
            {
              user ?
                <AñadirOferta metodoCrearOferta={crearOferta}></AñadirOferta>
                :
                <span></span>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
