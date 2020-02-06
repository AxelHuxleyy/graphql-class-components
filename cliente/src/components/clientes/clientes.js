import React, {Fragment, useState} from 'react'
import {Query, Mutation} from 'react-apollo'
import {CLIENTES_QUERY} from '../../queries/index'
import {ELIMINAR_CLIENTE} from '../../mutations'
import { Link } from 'react-router-dom'
import Paginador from '../Paginador'

function Clientes  () {
    const limite= 3
     const [eliminado, setEliminado] = useState(false)

     const [paginador, setPaginador] = useState({
         offset: 0,
         actual: 1
     })


     const paginaAnterior = () =>{
        setPaginador({
            offset: paginador.offset - limite,
            actual: paginador.actual - 1
        })
    }

     const paginaSiguiente = () =>{
        setPaginador({
            offset: paginador.offset + limite,
            actual: paginador.actual + 1
        })
     }
     let respuesta = (eliminado)? <p className="alert alert-info p-3 text-center">usuario elimnado</p> : ''

    return (
    <Query query={CLIENTES_QUERY} pollInterval={500} variables={{limite: limite, offset: paginador.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) =>{
            if(loading) return "cargando..."
            if(error) return `Error en ${error}`

            return (
                <Fragment>

                    <h2 className="text-center "> Listado de clientes</h2>
                    {respuesta}
                    <ul className="list-group mt-4">
                        {data.getClientes.map(item => { //se tiene que hacer asi ya que si usamos parentesis decimos que todo se va a retornar y necesitamos obtener el id
                            const {id} = item 
                            return (
                            <li key={item.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        {item.nombre} {item.apellido} {item.empresa}
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <Link to={`/pedidos/nuevo/${id}`} className="btn btn-warning d-block d-md-inline mr-2"> &#43; Nuevo pedido</Link>
                                        <Mutation mutation={ELIMINAR_CLIENTE}  
                                        onCompleted= { () =>{
                                            setEliminado(true)
                                            setTimeout(() => {
                                                setEliminado(false)
                                            }, 3000);
                                        }}
                                        >
                                            {eliminarCliente => (
                                                <button type="button"  className="btn btn-danger d-block d-md-inline-block mr-2" 
                                                onClick={() => {
                                                    if(window.confirm("¿seguro que queires eliminar este cliente?"))
                                                    {
                                                        eliminarCliente({
                                                            variables: {id}
                                                        })
                                                    }
                                                    
                                                
                                                }}
                                                > 
                                                    &times; Eliminar
                                                </button>
                                            )}
                                            

                                        </Mutation>
                                        <Link to={`/clientes/editar/${item.id}`}className="btn btn-success d-block d-md-inline-block">
                                            Editar cliente
                                        </Link>
                                    </div>

                                </div>
                            </li>
                            )})}
                    </ul>
                    <Paginador actual={paginador.actual} totalClientes={data.totalClientes} limite={limite} paginaSiguiente={paginaSiguiente} paginaAnterior={paginaAnterior}></Paginador>
                </Fragment>
            )

        }}

    </Query>
)
}

export default Clientes