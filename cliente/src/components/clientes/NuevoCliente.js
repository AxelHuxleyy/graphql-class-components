import React, {  Fragment, useState } from 'react'
import { NUEVO_CLIENTE } from '../../mutations'
import { Mutation } from 'react-apollo'

function NuevoCliente(props) {

    //Declaracion de hooks
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        edad: '',
        tipo: ''
    })
    const [error, setError] = useState(false)
    const [emails, setEmails] = useState([])
    //Termina delcaracion de hooks
    //variables
    let respuesta = (error)? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios </p> : ''
    //funciones 
    const nuevoCampo = () =>{
        setEmails(emails.concat([{email:''}]))
    }
    const quitarCampo = i => () =>{
        setEmails(emails.filter((email, index) => i !== index))
    }
    const leerCampo = i => e =>{
        const leearcampos = emails.map((email, index) =>{
            if(i !== index) return email
            return  {
                email: e.target.value
            }
        })

        setEmails(leearcampos)


    }
    return (
        <Fragment>
            <h2 className="text-center">Nuevo Cliente</h2>
            {respuesta}
            <div className="row justify-content-center">
                <Mutation mutation={NUEVO_CLIENTE}
                onCompleted={() => props.history.push('/clientes')}
                >
                    {crearCliente => (
                        <form className="col-md-8 m-3"

                            onSubmit={e => {
                                e.preventDefault();
                                const { nombre, edad, apellido, empresa,  tipo } = cliente
                                
                                if(nombre === '' || apellido === '' || empresa==='' || edad=== '' || tipo === '')
                                {
                                    console.log(error)
                                    setError(true)
                                    return;
                                }
                                setError(false)
                                const input = {
                                    nombre,
                                    apellido,
                                    empresa,
                                    edad: Number(edad),
                                    tipo,
                                    emails
                                }
                                
                                crearCliente(
                                    {
                                        variables: {input} //le pasamos las variables que deifinomos previamente para el mutation que tenemos en la carpeta mutations, lo mandamos por props esta vez
                                    }
                                )
                            }

                            }

                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" placeholder="Nombre" onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellido</label>
                                    <input type="text" className="form-control" placeholder="Apellido" onChange={(e) => setCliente({ ...cliente, apellido: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Empresa</label>
                                    <input type="text" className="form-control" placeholder="Empresa" onChange={(e) => setCliente({ ...cliente, empresa: e.target.value })} />
                                </div>
                            </div>
                            {emails.map((input, index) =>(
                                <div className="form-row" key={index}>
                                    <div  className="form-group   justify-content-center col-md-12" >
                                    <label>Correo {index+1}</label>
                                    <div className="input-group">
                                        <input type="email" 
                                        placeholder="email"
                                        className="form-control col-md-12"
                                        onChange={leerCampo(index)}
                                        
                                        />
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-danger"onClick={quitarCampo(index)} >&times; eliminar</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                </div>
                                
                            ))}
                            <div className="form-group d-flex  justify-content-center col-md-12">
                                <button type="button" className="btn btn-warning" onClick={nuevoCampo}>
                                    + Agregar email</button>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input type="text" className="form-control" placeholder="Edad" onChange={(e) => setCliente({ ...cliente, edad: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>
                                    <select className="form-control" onChange={(e) => setCliente({ ...cliente, tipo: e.target.value })}>
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                        </form>
                    )}
                </Mutation>

            </div>


        </Fragment>

    )
}

export default NuevoCliente;