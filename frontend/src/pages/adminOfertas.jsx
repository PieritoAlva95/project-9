import React, { Fragment, useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Sidebar from '../components/sidebar';
const { SearchBar, ClearSearchButton } = Search;

const AdminOfertas = ({ setLogeado }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [ofertas, setOfertas] = useState([])
    const imgURL = "http://localhost:4000/uploads/";

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
            dataField:'cuerpo',
            text:'Descripción'
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
                if (row.status) {
                    return (
                        <button style={estiloBtnDelete} onClick={() => desactivar(row)}>Desactivar</button>
                    );
                } else {
                    return (
                        <button style={estiloBtnDelete} onClick={() => activar(row)}>Activar</button>
                    );
                }
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
        onselect: selectedRow
    };

    const getOfertas = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            'http://localhost:4000/api/oferta',
            requestOptions
        );
        const data = await response.json();
        setOfertas(data.ofertas);
    }

    const editarOferta = async (oferta) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token,
            },
            body: JSON.stringify(oferta),
        };
        const response = await fetch(
            'http://localhost:4000/api/oferta/' + oferta._id,
            requestOptions
        );
        const data = await response.json();
        alert("Sus cambios se han guardado satisfactoriamente");
        getOfertas();
    };

    const desactivar = (oferta) => {
        oferta.status = false;
        editarOferta(oferta);
    }

    const activar = (oferta) => {
        oferta.status = true;
        editarOferta(oferta);
    }

    useEffect(() => {
        getOfertas();
    }, [])
    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <div className="container main-admin">
                            <div className="row">
                                <div className="col-12 main-tabla">
                                    <h2>Administrar Ofertas</h2>
                                    <ToolkitProvider keyField='id'
                                        data={ofertas}
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
                                                        pagination={paginationFactory()}
                                                    />

                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AdminOfertas;