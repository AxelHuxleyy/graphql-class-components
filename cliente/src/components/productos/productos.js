import React, { Fragment, useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { OBTENER_PRODUCTOS } from '../../queries'
import { ELIMINAR_PRODUCTO } from '../../mutations'
import { Link } from 'react-router-dom'
import Exito from '../alertas/exito'

import Paginador from '../Paginador'

export default function Productos() {


    const limite = 3

    const [paginador, setPaginador] = useState({
        offset: 0,
        actual: 1
    })


    const paginaAnterior = () => {
        setPaginador({
            offset: paginador.offset - limite,
            actual: paginador.actual - 1
        })
    }

    const paginaSiguiente = () => {
        setPaginador({
            offset: paginador.offset + limite,
            actual: paginador.actual + 1
        })
    }

    const [eliminado, setEliminado] = useState(false)

    let respuesta = (eliminado) ? <Exito mensaje="Se elimono correctamente" /> : ''
    return (
        <Fragment>
            <h1 className="text-center mb5">Productos</h1>
            {respuesta}
            <Query query={OBTENER_PRODUCTOS} pollInterval={500} variables={{limite: limite, offset: paginador.offset}}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return "cargando..."
                    if (error) return `Error en ${error}`
                    console.log(data)

                    return (
                        <Fragment>


                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Existencia</th>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col">Editar</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {data.getProductos.map((producto, i) => {
                                        const { id } = producto
                                        console.log(id)

                                        return (
                                            <tr key={id}>

                                                <td> {producto.nombre} </td>
                                                <td> {producto.precio} </td>
                                                <td> {producto.stock} </td>
                                                <td>
                                                    <Mutation mutation={ELIMINAR_PRODUCTO}
                                                        onCompleted={() => {
                                                            setEliminado(true)
                                                            setTimeout(() => {
                                                                setEliminado(false)
                                                            }, 3000);
                                                        }}

                                                    >
                                                        {eliminarProducto => (

                                                            <button className="btn btn-danger" onClick={() => {
                                                                if (window.confirm("Seguro que deseas eliminar este producto?")) {
                                                                    eliminarProducto({ variables: { id } })

                                                                }
                                                            }}>&times; Eliminar</button>

                                                        )}
                                                    </Mutation>


                                                </td>
                                                <td> <Link to={`/productos/editar/${id}`} className="btn btn-success ">Editar producto</Link></td>
                                            </tr>

                                        )

                                    })}
                                </tbody>

                            </table>
                            <Paginador actual={paginador.actual} total={data.totalProductos} limite={limite} paginaSiguiente={paginaSiguiente} paginaAnterior={paginaAnterior}></Paginador>

                        </Fragment>




                    )
                }}
            </Query>
        </Fragment>
    )
}