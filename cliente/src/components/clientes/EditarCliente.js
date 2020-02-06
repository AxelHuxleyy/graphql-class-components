import React, { Fragment } from 'react'
import { OBTENER_CLIENTE_QUERY } from '../../queries'
import { Query } from 'react-apollo'
import FormularioEditarCliente from './formularioEditarCliente'



function EditarCliente(props) {

    const { id } = props.match.params
    console.log(id)
    return (

        <Fragment>

            <h2 className="text-center">Nuevo Cliente</h2>

            <div className="justify-content-center row">
                <Query query={OBTENER_CLIENTE_QUERY} variables={{ id }}>
                    {({ loading, data, error, refetch }) => { //refetch lo que hace es que actualiza la cache cada vez que se le pide

                        if (loading) return "cargando..."
                        if (error) return `hay un problema ${error}`
                        console.log(data)
                        return (
                            <FormularioEditarCliente 
                            cliente={data.getCliente} 
                            refetch={refetch} //aqui es como llamamos a refetch 
                            />
                            
                        )
                    }}
                </Query>
            </div>  
        </Fragment>


    )
}

export default EditarCliente;