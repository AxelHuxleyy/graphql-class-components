import React, { Fragment, useState } from 'react'
import { NUEVO_PRODUCTO } from '../../mutations'
import { Mutation } from 'react-apollo'

const initialState={
    nombre:'', precio:'', stock: ''
}

export default function NuevoPropducto(props) {
    const [datos, setdatos] = useState({ ...initialState})


    const actualizarState = e => {
        const { name, value } = e.target
        setdatos({
            ...datos,
            [name]: value
        })
    }

    const limpiarState= () =>{
        setdatos(initialState)
    }

    const validarForm = () => {
        const noValido = !datos.nombre || !datos.precio || !datos.stock
        return noValido
    }
    const crearNuevoProducto = (e, nuevoProducto) =>{
        console.log("hola")
        e.preventDefault();

        //insetamos en la base de datos

        nuevoProducto().then(data=>{
            limpiarState()
            props.history.push('/productos')

            
        })
    }

    const { nombre, stock, precio } = datos

    const input = {
        nombre,
        precio: Number(precio),
        stock: Number(stock)
    }

    return (

        <Fragment>
            <h1 className="align-center mb-5">Crear nuevo producto</h1>

            <div className="row justify-content-center">
                <Mutation

                    mutation={NUEVO_PRODUCTO}
                    variables={
                        {input}
                    }

                >
                    {(nuevoProducto, { loading, error, data }) => {
                        return (
                            <form
                                className="col-md-8"
                                onSubmit = {
                                    e =>crearNuevoProducto( e, nuevoProducto)
                                }
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre del Producto"
                                        onChange={actualizarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input
                                            type="number"
                                            name="precio"
                                            className="form-control"
                                            placeholder="Precio del Producto"
                                            onChange={actualizarState}

                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-control"
                                        placeholder="stock del Producto"
                                        onChange={actualizarState}

                                    />
                                </div>
                                <button
                                    disabled={validarForm()}
                                    type="submit"
                                    className="btn btn-success float-right">
                                    Crear Producto
                                </button>
                            </form>

                        )
                    }}

                </Mutation>

            </div>

        </Fragment>
    )
}
