import gql from 'graphql-tag'

export const CLIENTES_QUERY = gql`
    query getClientes($limite: Int, $offset: Int){
    getClientes(limite: $limite, offset: $offset){
      id
      nombre
      apellido
      empresa
      edad
      }
      totalClientes

    }
  `;


export const OBTENER_CLIENTE_QUERY = gql`
query obtenerCliente($id:ID){
  getCliente(id: $id){
    id
    nombre
    apellido
    empresa
    edad
    emails{
      email
    }
    tipo
  }
}
`

export const OBTENER_PRODUCTOS= gql `
query getProductos($limite: Int, $offset:Int){
  getProductos(limite: $limite, offset:$offset){
    id,nombre,precio,stock
  }
  totalProductos
}
`

export const OBTENER_PRODUCTO= gql `
query getProducto($id: ID!){
  getProducto(id: $id){
    nombre
    stock
    precio
  }
}
`