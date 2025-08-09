
import { Cliente, CadastroClientes } from "./classes.js";
import { listarNomes, encontrarClientesPorEmail, contarClientes } from "./utils.js";

const apiUrl = "https://crudcrud.com/api/70a1df6d0c7d46b98f67d3379a53fb0a/cadastros";
const cadastro = new CadastroClientes(apiUrl);

const listaClientes = document.getElementById("listaClientes");
const botaoAdd = document.getElementById("add");

async function atualizarLista() {
    const clientes = await cadastro.carregarClientes();
    listaClientes.innerHTML = "";
    
    clientes.forEach(cliente => {
        const item = document.createElement("li");
        item.innerHTML = `<span><strong>${cliente.nome}</strong> - ${cliente.email}</span>`;
        
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "✖";
        botaoExcluir.addEventListener("click", async () => {
            const confirma = confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`);
            if (confirma) {
                await cadastro.excluirCliente(cliente._id);
                atualizarLista();
            }
        });

        item.appendChild(botaoExcluir);
        listaClientes.appendChild(item);
    });

    console.log("Lista de nomes:", listarNomes(clientes));
    console.log("Total de clientes:", contarClientes(clientes));
}

botaoAdd.addEventListener("click", async () => {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    if(!nome || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    const clienteExistente = encontrarClientesPorEmail(cadastro.clientes, email);
    if (clienteExistente) {
        alert("E-mail já cadastrado!");
        return;
    }

    const novoCliente = new Cliente(nome, email);
    await cadastro.adicionarCliente(novoCliente);

    nomeInput.value = "";
    emailInput.value = "";

    atualizarLista();

});

atualizarLista();
