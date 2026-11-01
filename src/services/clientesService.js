import axios from "axios";

const URL = "https://fakestoreapi.com/users";
const STORAGE_CLIENTES = "clientes";

let clientes = [];

const guardarClientes = () => {
    localStorage.setItem(
        STORAGE_CLIENTES,
        JSON.stringify(clientes)
    );
};

const cargarClientesGuardados = () => {
    const datos = localStorage.getItem(STORAGE_CLIENTES);

    if (datos !== null) {
        clientes = JSON.parse(datos);
        return true;
    }

    return false;
};

const obtenerClientes = async () => {

    if (cargarClientesGuardados()) {
        return clientes.filter(
            (cliente) => cliente.disponible !== false
        );
    }

    const respuesta = await axios.get(URL);

    clientes = respuesta.data.map((cliente) => ({
        ...cliente,
        disponible: true,
        creadoLocalmente: false
    }));

    guardarClientes();

    return clientes;
};

const obtenerCliente = async (id) => {

    await obtenerClientes();

    const cliente = clientes.find(
        (cliente) =>
            String(cliente.id) === String(id) &&
            cliente.disponible !== false
    );

    if (!cliente) {
        return null;
    }

    if (cliente.creadoLocalmente) {
        return cliente;
    }

    const respuesta = await axios.get(`${URL}/${id}`);

    return respuesta.data;
};

const crearCliente = async (cliente) => {

    await obtenerClientes();

    const respuesta = await axios.post(URL, cliente);
    const idServidor = respuesta.data.id;

    const nuevoId = clientes.length > 0
        ? Math.max(...clientes.map((c) => Number(c.id))) + 1
        : 1;

    const nuevoCliente = {
        ...cliente,
        id: nuevoId,
        idServidor: idServidor,
        disponible: true,
        creadoLocalmente: true
    };

    clientes.push(nuevoCliente);

    guardarClientes();

    return nuevoCliente;
};

const eliminarCliente = async (id) => {

    await obtenerClientes();

    const cliente = clientes.find(
        (c) =>
            String(c.id) === String(id) &&
            c.disponible !== false
    );

    if (!cliente) {
        return null;
    }

    if (!cliente.creadoLocalmente) {
    await axios.delete(`${URL}/${id}`);
}

    cliente.disponible = false;

    guardarClientes();

    return cliente;
};

export default {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    eliminarCliente
};