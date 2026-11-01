import '../css/formcliente.css'
import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import clientesService from "../services/clientesService";

const FormCliente = ({ onClienteCreado }) => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validar = () => {
        if (!nombre.trim()) {
            return "El nombre es obligatorio";
        }

        if (nombre.trim().length < 3) {
            return "El nombre debe tener al menos 3 caracteres";
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombre)) {
            return "El nombre solo puede contener letras";
        }

        if (!apellido.trim()) {
            return "El apellido es obligatorio";
        }

        if (apellido.trim().length < 3) {
            return "El apellido debe tener al menos 3 caracteres";
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(apellido)) {
            return "El apellido solo puede contener letras";
        }

        if (!email.trim()) {
            return "El email es obligatorio";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "El email no es válido";
        }

        if (!telefono.trim()) {
            return "El teléfono es obligatorio";
        }

        if (!/^[0-9]+$/.test(telefono)) {
            return "El teléfono debe contener solo números";
        }

        if (telefono.length < 7) {
            return "El teléfono debe tener al menos 7 números";
        }

        if (!ciudad.trim()) {
            return "La ciudad es obligatoria";
        }

        if (ciudad.trim().length < 2) {
            return "Ingrese una ciudad válida";
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(ciudad)) {
            return "La ciudad solo puede contener letras";
        }

        return "";
    };

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        const errorValidacion = validar();

         if (errorValidacion) {
            setError(errorValidacion);
            return;
        }

        const nuevoCliente = {
            email: email.trim(),
            username: nombre.toLowerCase().replace(/\s/g, ""),
            password: "1234",
            name: {
                firstname: nombre.trim(),
                lastname: apellido.trim()
            },
            address: {
                city: ciudad.trim()
            },
            phone: telefono.trim()
        };

        try {

            setLoading(true);

            const respuesta = await clientesService.crearCliente(nuevoCliente);

            setMensaje(`Cliente creado correctamente. ID: ${respuesta.id}`);
            
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            
            setNombre("");
            setApellido("");
            setEmail("");
            setTelefono("");
            setCiudad("");

            onClienteCreado?.(respuesta);

        } catch {
            setError("Ocurrió un error al crear el cliente.");
        } finally {

            setLoading(false);

        }

    };

    return (

        <div className='formulario-cliente'>

            <h3>Nuevo Cliente</h3>

            <Form onSubmit={manejarSubmit}>

                <Form.Group className="mb-3">

                    <Form.Label>Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => {
                           setNombre(e.target.value);
                           setError("");
                        }}
                    />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        value={apellido}
                        onChange={(e) => {
                            setApellido(e.target.value);
                            setError("");
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                           setError("");
                        }}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Teléfono</Form.Label>

                    <Form.Control
                        type="text"
                        value={telefono}
                        onChange={(e) => {
                            setTelefono(e.target.value);
                            setError("");
                        }}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Ciudad</Form.Label>

                    <Form.Control
                        type="text"
                        value={ciudad}
                        onChange={(e) => {
                            setCiudad(e.target.value);
                            setError("");
                        }}
                    />

                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >

                    {loading ? <Spinner size="sm" /> : "Guardar Cliente"}

                </Button>

            </Form>

            {mensaje && (
                <Alert className="mt-3" variant="success">
                    {mensaje}
                </Alert>
            )}

            {error && (
                <Alert className="mt-3" variant="danger">
                    {error}
                </Alert>
                )}

        </div>

    );
};

export default FormCliente;