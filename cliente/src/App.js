import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//importar componentes
import Header from './components/layout/Header'
import Clientes from './components/clientes/clientes'
import NuevoCliente from './components/clientes/NuevoCliente'
import EditarCliente from './components/clientes/EditarCliente'
import NuevoProducto from './components/productos/nuevoProducto'
import productos from './components/productos/productos'
import EditarProductos from './components/productos/editarProducto'
import NuevoPedido from './components/pedidos/nuevopedido'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false //quita que mande los datos en el aray con type_name SIEMPRE HAS ESTO
  }),
  onError: ({ netWorkError, graphQLErrors }) => {
    console.log('graphQLErros', graphQLErrors);
    console.log('netWorkError', netWorkError);
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/clientes" component={Clientes}/>
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />
              <Route exact path="/productos" component={productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProductos} />
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />


            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
