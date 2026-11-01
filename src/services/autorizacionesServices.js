const usuarios = [
  {
    email: 'antonella@gmail.com',
    password: 'Admin123',
    nombre: 'Antonella',
    sector: 'Soporte'
  },
  {
    email: 'jimena@gmail.com',
    password: 'Admin123',
    nombre: 'Jimena',
    sector: 'Gerencia'
  },
  {
    email: 'maia@gmail.com',
    password: 'Admin123',
    nombre: 'Maia',
    sector: 'Gerencia'
  },
  {
    email: 'abril@gmail.com',
    password: 'Admin123',
    nombre: 'Abril',
    sector: 'Soporte'
  },
  {
    email: 'guadalupe@gmail.com',
    password: 'Admin123',
    nombre: 'Guadalupe',
    sector: 'Soporte'
  },
  {
    email: 'lourdes@gmail.com',
    password: 'Admin123',
    nombre: 'Lourdes',
    sector: 'Gerencia'
  }
]

const login = (email, password) => {
  return usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.password === password
  )
}

const validar = (email, password) => {
  const nuevosErrores = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    nuevosErrores.email = 'El email es obligatorio'
  } else if (!emailRegex.test(email)) {
    nuevosErrores.email = 'Email inválido'
  }

  if (!password) {
    nuevosErrores.password = 'La contraseña es obligatoria'
  } else {
    if (password.length < 8) {
      nuevosErrores.password = 'Mínimo 8 caracteres'
    } else if (!/[A-Z]/.test(password)) {
      nuevosErrores.password = 'Debe tener una mayúscula'
    } else if (!/[0-9]/.test(password)) {
      nuevosErrores.password = 'Debe tener un número'
    }
  }

  return nuevosErrores
}

const contarUsuariosPorSector = (sector) => {
  return usuarios.filter(
    usuario => usuario.sector === sector
  ).length
}

const obtenerSector = (email) => {
  const usuario = usuarios.find(
    usuario => usuario.email === email.trim().toLowerCase()
  )

  return usuario ? usuario.sector : ""
}

export default {
  login,
  validar,
  contarUsuariosPorSector,
  obtenerSector
}