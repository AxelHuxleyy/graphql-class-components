import React, { useState } from 'react';
import { ACTUALIZAR_CLIENTE } from '../../mutations'
import { Mutation } from 'react-apollo'
import {withRouter} from 'react-router-dom' // esto permite obtener el history se  exporta el componennte con esto  

function FormularioEditarCliente(props) {


    const [emails, setEmails] = useState(props.cliente.emails)

    const [cliente, setCliente] = useState(props.cliente)


    const nuevoCampo = () => {
        setEmails(emails.concat([{ email: '' }]))


    }

    const leerCampo = i => e => {


        const leearcampos = emails.map((email, index) => {
            if (i !== index) return email
            return {
                email: e.target.value
            }
        })

        setEmails(leearcampos)
    }

    const quitarCampo = i => () => {


        setEmails(emails.filter((email, index) => i !== index))

    }

    const { id, nombre, apellido, empresa, edad, tipo } = cliente



    return (

        <Mutation mutation={ACTUALIZAR_CLIENTE} 
        onCompleted={() => props.refetch().then(() => { //aqui aplicamos el refetch para actualizar la cache datos y asi tener al mometo los ultimos datos
            props.history.push('/clientes')
        })}
        >
            {actualizarCliente => (
                    <form className="col-md-8 m-3" onSubmit={e => {
                        e.preventDefault();
                        
                        
                        const input = {
                            id,
                            nombre, 
                            edad : Number(edad), 
                            tipo, 
                            apellido, 
                            empresa,
                            emails,
                        }
                        console.log(input)
                        actualizarCliente(
                            {variables:{input}} //es importante pasar las perras variables de esta perra forma 
                        )
                    }}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={nombre}
                                    onChange={e => {
                                        setCliente(
                                            {
                                                ...cliente,
                                                nombre: e.target.value
                                            }
                                        )
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={apellido}
                                    onChange={e => {
                                        setCliente(
                                            {
                                                ...cliente,
                                                apellido: e.target.value
                                            }
                                        )
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={empresa}
                                    onChange={e => {
                                        setCliente(
                                            {
                                                ...cliente,
                                                empresa: e.target.value
                                            }
                                        )
                                    }}
                                />
                            </div>

                            {emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Email {index + 1} : </label>
                                    <div className="input-group">

                                        <input
                                            type="email"
                                            placeholder={`Email`}
                                            className="form-control"
                                            onChange={leerCampo(index)}
                                            defaultValue={input.email}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={quitarCampo(index)}>
                                                &times; Eliminar
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button
                                    onClick={nuevoCampo}
                                    type="button"
                                    className="btn btn-warning"
                                >+ Agregar Email</button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={edad}
                                    onChange={e => {
                                        setCliente(
                                            {
                                                ...cliente,
                                                edad: e.target.value
                                            }
                                        )
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>
                                <select
                                    className="form-control"
                                    value={tipo}
                                    onChange={e => {
                                        setCliente(
                                            {
                                                ...cliente,
                                                tipo: e.target.value
                                            }
                                        )
                                    }}
                                >
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )
            }



        </Mutation>


    )
}


export default withRouter(FormularioEditarCliente);