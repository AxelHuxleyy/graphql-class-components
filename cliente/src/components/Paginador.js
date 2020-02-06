import React, { useState } from 'react'


function Paginador(props){

    const [paginador] = useState({
        paginas: Math.ceil(Number(props.total) / props.limite)
    })
    const {actual} = props

    const btnanterior = (actual > 1) ? <button type="button" className="btn btn-success mr-2" onClick={props.paginaAnterior}> &laquo; Anterior</button> : ''



    const {paginas} = paginador
    const btnsiguiente = (actual !== paginas) ? <button type="button" className="btn btn-success " onClick={props.paginaSiguiente}>  Siguiente &raquo;</button> : ''

    console.log(btnsiguiente)

    return(
        <div className="mt-5 d-flex justify-content-center">

            {btnanterior}
            {btnsiguiente}

        </div>
    )
}
export default Paginador