import React, { useState } from 'react';
import {Mutation} from 'react-apollo'
import {ACTUALIZAR_PRODUCTO} from '../../mutations'
import {withRouter} from 'react-router-dom'

const initialState={
    nombre:'', precio:'', stock: ''
}
 function FormularioEditar(props){

    

    const [datos2, setdatos] = useState({ ...props.producto.getProducto})

    const limpiarState= () =>{
        setdatos(initialState)
    }

    const actualizarState = e => {
        const { name, value } = e.target
        setdatos({
            ...datos2,
            [name]: value
        })
    }

    const validarForm = () => {
        const noValido = !datos2.nombre || !datos2.precio || !datos2.stock
        return noValido
    }

    const editarProductoForm= (e, actualizarProducto) =>{ 
        console.log(input)  
        e.preventDefault();
        actualizarProducto().then(data=>{
            console.log(data)
        })
    }

    const { nombre, stock, precio } = datos2
    const {id} = props

    const input = {
        id,
        nombre,
        precio: Number(precio),
        stock: Number(stock)
    }
    return(
        <Mutation mutation={ACTUALIZAR_PRODUCTO} variables={{input}} onCompleted={ ()=> props.refetch().then(() =>props.history.push("/productos"))}>
            {(actualizarProducto, {loading, error, data}) =>{

                return(
                    <form 
                    className="col-md-8" 
                    onSubmit={e =>{
                        editarProductoForm(e, actualizarProducto)
                    }}
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={actualizarState}
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                value={datos2.nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={actualizarState}
                                    type="number" 
                                    name="precio" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    value={datos2.precio}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={actualizarState}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="stock del Producto" 
                                value={datos2.stock}
                            />
                        </div>
                        <button 
                            disabled={ validarForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form> 
                )
               
            }}

        </Mutation>
        
    )
}
export default withRouter(FormularioEditar);