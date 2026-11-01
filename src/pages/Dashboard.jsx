import '../css/dashboard.css'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import useAutorizaciones from '../hooks/useAutorizaciones'
import clientesService from '../services/clientesService'
import AutorizacionesService from '../services/autorizacionesServices'
import Login from './Login'

const Dashboard = () => {
  const { admin } = useAutorizaciones()

  const [totalClientes, setTotalClientes] = useState(null)
  const [error, setError] = useState(false)

  const totalGerencia =
    AutorizacionesService.contarUsuariosPorSector('Gerencia')

  const totalSoporte =
    AutorizacionesService.contarUsuariosPorSector('Soporte')

  useEffect(() => {
    if (!admin) return

    const cargarTotalClientes = async () => {

      try {
        const clientes = await clientesService.obtenerClientes()

        setTotalClientes(clientes.length)
      } catch (error) {
        console.error("Error al cargar clientes:", error)
        setError(true)
      }
    }

    cargarTotalClientes()
  }, [admin])

  return (
    <div className="dashboard">

      <h1>Panel de Control de Clientes</h1>

      {!admin ? (
        <div className="dashboard-login">
          <h3>Bienvenido al sistema</h3>
          <p>Ingrese sus credenciales para acceder.</p>
          <Login />
        </div>
      ) : (
        <>
          <div className="user-card">
            <h2>¡Bienvenida, {admin.nombre}!</h2>

            <h3>Usuario conectado</h3>

            <p><strong>Administrador:</strong> {admin.nombre}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Sector:</strong> {admin.sector}</p>
          </div>

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Clientes activos</h3>
              <p>
                {error ? (
                  'Error'
                ) : totalClientes === null ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  totalClientes
                )}
              </p>
            </div>

            <div className="dashboard-card">
              <h3>Gerencia</h3>
              <p>{totalGerencia}</p>
            </div>

            <div className="dashboard-card">
              <h3>Soporte</h3>
              <p>{totalSoporte}</p>
            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default Dashboard