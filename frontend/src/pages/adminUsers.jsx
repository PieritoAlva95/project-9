import React, { Fragment, useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Sidebar from '../components/sidebar';
const { SearchBar, ClearSearchButton } = Search;

const AdminUsers = ({ setLogeado }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [usuarios, setUsuarios] = useState([])
    const imgURL = "http://localhost:4000/uploads/";

    const estiloBtnDelete = {
        backgroundColor: "#ff6b6b",
        color: "#fafafa",
        borderStyle: "none"
    };
    const estiloAdmin = {
        backgroundColor: "#1d3557",
        color: "#fafafa",
        borderStyle: "none"
    };
    const estiloUser = {
        backgroundColor: "#ffe66d",
        color: "#1d3557",
        borderStyle: "none"
    };
    

    const columns = [
        {
            dataField: '',
            text: 'Imagen',
            formatter: (cellContent, row) => {
                return(
                    <img className="img-table" src={imgURL+row.img} />
                );
            }
        },
        {
            dataField: 'nombres',
            text: 'Nombres'
        },
        {
            dataField: 'apellidos',
            text: 'Apellidos'
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: "",
            text: 'Estado',
            formatter: (cellContent, row) => {
                if (row.activo) {
                    return (
                        <button style={estiloBtnDelete} onClick={() => desactivar(row)}>Desactivar</button>
                    );
                } else {
                    return (
                        <button style={estiloBtnDelete} onClick={() => activar(row)}>Activar</button>
                    );
                }
            }
        },
        {
            dataField:"",
            text:"Tipo Usuario",
            formatter: (cellContent, row) => {
                if(row.esAdmin){
                    return(
                        <button style={estiloAdmin} onClick={() => noHacerAdmin(row)}>Admin</button>
                    );
                }else{
                    return(
                        <button style={estiloUser} onClick={() => hacerAdmin(row)}>User</button>
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

    const getUsuarios = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            'http://localhost:4000/api/usuarios/obtener/usuarios/'+user.usuarioDB.uid,
            requestOptions
        );
        const data = await response.json();
        setUsuarios(data);
    }

    const editarUser = async (useredit) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token,
            },
            body: JSON.stringify(useredit),
        };
        const response = await fetch(
            'http://localhost:4000/api/usuarios/' + useredit.uid,
            requestOptions
        );
        const data = await response.json();
        alert("Sus cambios se han guardado satisfactoriamente");
        getUsuarios();
    };

    const desactivar = (user) => {
        user.activo = false;
        editarUser(user);
    }

    const activar = (user) => {
        user.activo = true;
        editarUser(user);
    }

    const hacerAdmin = (usuario) =>{
        usuario.esAdmin = true;
        editarUser(usuario);
    }

    const noHacerAdmin = (usuario) =>{
        usuario.esAdmin = false;
        editarUser(usuario);
    }

    useEffect(() => {
        getUsuarios();
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
                                    <h2>Administrar Usuarios</h2>
                                    <ToolkitProvider keyField='id'
                                        data={usuarios}
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
};

export default AdminUsers;