import '../css/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  
  const sectorDetectado = AutorizacionesService.obtenerSector(email)

  const { setAdmin } = useAutorizaciones()
  const navigate = useNavigate()

  const manejarSubmit = (e) => {
    e.preventDefault()

    const nuevosErrores = AutorizacionesService.validar(
      email,
      password
    )

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) return

    const usuario = AutorizacionesService.login(
      email,
      password
    )

    if (!usuario) {
      alert('Correo o contraseña incorrectos')
      return
    }

    setAdmin({
      nombre: usuario.nombre,
      email: usuario.email,
      sector: usuario.sector
    })

    navigate('/')
  }

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={manejarSubmit}>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.email || ' '}
        </p>

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.password || ' '}
        </p>

        <label>Sector:</label>
        <select value={sectorDetectado} disabled>
          <option value="">Sector no detectado</option>
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Login