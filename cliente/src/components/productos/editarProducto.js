import React, { Fragment } from 'react'
import {Query} from 'react-apollo'
import {OBTENER_PRODUCTO} from '../../queries'
import FormularioEditar from './formularioEditarProducto'


export default function EditarProductos(props){

    //obtiene el id de la url
    const {id} = props.match.params

    return(
        <Fragment>
         <h1>Editar producto {id}</h1>

         <div className="row justify-content-center">
            <Query query={OBTENER_PRODUCTO} variables={{id}}>
                {({loading, error, data, refetch}) =>{
                    if(loading) return 'cargando...'
                    if(error) return error.message
                    console.log(data)
                    return(
                        <FormularioEditar
                        producto={data}
                        id={id}
                        refetch={refetch}
                        />
                    )   

                }}
            </Query>

         </div>


        </Fragment>
    )

}