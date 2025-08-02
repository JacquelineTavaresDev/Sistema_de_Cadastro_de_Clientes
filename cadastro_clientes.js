

fetch("https://crudcrud.com/api/5d84bfc2dd6d469db3d0aeedd586b8c2/cadastros")

    .then(resposta => resposta.json())
    .then((clientes) => {
        const lista = document.getElementById("listaClientes");
        lista.innerHTML = "";
        
        clientes.forEach(cliente => {  
            const item = document.createElement("li");
            item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="excluirCliente('${cliente._id}')">Excluir</button>`;
            lista.appendChild(item);
        });
});

document.getElementById("add").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();  

    if(!nome || !email){
        alert("Preencha todos os campos.");
        return;
    }
    
    fetch("https://crudcrud.com/api/5d84bfc2dd6d469db3d0aeedd586b8c2/cadastros", {
       method: "POST",
       headers: {
            "Content-Type": "application/json"
       },
       body: JSON.stringify({nome, email})
    })
    .then(() => location.reload())
    .catch(erro => console.error("Erro ao cadastrar:", erro));
});

function excluirCliente(id) {
    fetch(`https://crudcrud.com/api/5d84bfc2dd6d469db3d0aeedd586b8c2/cadastros/${id}`, {
        method: "DELETE"
    })
    .then(() => location.reload())
    .catch(erro => console.error("Erro ao excluir", erro));
}