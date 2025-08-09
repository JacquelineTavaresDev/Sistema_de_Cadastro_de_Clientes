
export function listarNomes(clientes) {
    return clientes.map(cliente => cliente.nome);
}

export function encontrarClientesPorEmail(clientes, email) {
    return clientes.find(cliente => cliente.email === email);
}

export function contarClientes(clientes) {
    return clientes.reduce((total) => total + 1, 0);
}
