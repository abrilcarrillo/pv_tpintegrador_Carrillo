import '../css/detallecliente.css';
import { useEffect, useState } from "react";
import useAutorizaciones from "../hooks/useAutorizaciones";
import { useParams, useNavigate } from "react-router-dom";
import clientesService from "../services/clientesService";
 
const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAutorizaciones();
  const role = admin?.sector;

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;

    const cargarCliente = async () => {
      setLoading(true);
      setError(false);
      setCliente(null);

      try {
        const data = await clientesService.obtenerCliente(id);

        if (activo) {
          setCliente(data);
        }
      } catch (error) {
        if (activo) {
          setError(true);
        }
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    };

    cargarCliente();

    return () => {
      activo = false;
    };
  }, [id]);

  const eliminarCliente = async () => {
    if (role?.trim() !== "Gerencia") {
      return;
    }

    try {
      const respuesta = await clientesService.eliminarCliente(id);

      if (respuesta) {
        setMensaje("Cliente eliminado correctamente");

        setTimeout(() => {
          navigate("/clientes");
        }, 5000);
      } else {
        setMensaje("No se encontró el cliente");
      }
    } catch (error) {
      setMensaje("Error al eliminar cliente");
    }
  };

  if (loading) {
    return <h2>Cargando cliente...</h2>;
  }

  if (error) {
    return <h2>Error al cargar el cliente.</h2>;
  }

  if (!cliente) {
    return <h2>Cliente no encontrado.</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className="mensaje-eliminado">{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre y Apellido:</strong>{" "}
        {cliente.name?.firstname ?? "No especificado"}{" "}
        {cliente.name?.lastname === "-"
          ? ""
          : cliente.name?.lastname ?? ""}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email ?? "No especificado"}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone ?? "No especificado"}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address?.street ?? "No especificado"}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address?.number ?? "No especificado"}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address?.zipcode ?? "No especificado"}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address?.city ?? "No especificado"}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username ?? "No especificado"}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password ?? "No especificado"}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className="btn-eliminar" onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;