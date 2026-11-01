import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ListaClientes from '../pages/ListaClientes'
import DetalleCliente from '../pages/DetalleCliente'
import ErrorPage from '../pages/ErrorPage'
import RutaProtegida from '../components/RutaProtegida'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        index: true,
        element: (
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        )
      },
      {
        path: 'clientes',
        element: (
          <RutaProtegida>
            <ListaClientes />
          </RutaProtegida>
        )
      },
      {
        path: 'clientes/:id',
        element: (
          <RutaProtegida>
            <DetalleCliente />
          </RutaProtegida>
        )
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

export default router