import React, { Fragment, useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Sidebar from './sidebar';
const { SearchBar, ClearSearchButton } = Search;

const Contratos = ({ setLogeado }) => {

    const user = JSON.parse(window.localStorage.getItem('user'));
    const [ofertasContratos, setOfertasContratos] = useState([]);

    const estiloBtnDelete = {
        backgroundColor: "#ff6b6b",
        color:"#fafafa",
        borderStyle:"none"
      };

    const columns = [
        {
            dataField: 'titulo',
            text: 'Titulo'
        },
        {
            dataField: 'interesados[0].nombres',
            text: 'Nombres'
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
            dataField:"",
            text: 'Acción',
            formatter: (cellContent, row) => {
                return(
                    // <p>{row.precio}</p>
                    <button style={estiloBtnDelete} onClick={()=>finalizar(row)}>Finalizar Contrato</button>
                );
            }
        }
    ];

    const selectedRow = (row, isSelect, rowIndex) => {
        this.setState(curr => ({ ...curr, selectedRow: row }));
        console.log(row);
      };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        onselect:selectedRow
      };

    const cargarOfertasContratos = async () => {

        if (user != null) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const resp = await fetch(
                'http://localhost:4000/api/oferta/usuario/contratos/' + user.usuarioDB.uid,
                requestOptions
            );
            const res = await resp.json();
            setOfertasContratos(res);
        }
    }

    const finalizarContrato = async (oferta) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token
            },
            body: JSON.stringify(oferta)
        };
        const response = await fetch('http://localhost:4000/api/oferta/' + oferta._id, requestOptions);
        const data = await response.json();
        cargarOfertasContratos();
    }

    const finalizar = (oferta) => {
        var response = window.confirm("Esta seguro de finalizar el contrato?");
        if (response == true) {
            oferta.disponible = "contrato finalizado";
            finalizarContrato(oferta);
        } else {
            alert("Su contrato no ha sido finalizado");
        }
    }

    useEffect(() => {
        cargarOfertasContratos();
    }, [])
    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <div className='container main-contratos main-tabla'>
                            <h2>Tus Contratos</h2>
                            <ToolkitProvider keyField='id'
                                data={ofertasContratos}
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
                                                selectRow={ selectRow }
                                                pagination={ paginationFactory() }
                                            />
                                            
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Contratos;