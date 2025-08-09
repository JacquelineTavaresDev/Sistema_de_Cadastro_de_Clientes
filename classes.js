
export class Cliente {
    constructor (nome, email, id = null){
        this.nome = nome;
        this.email = email;
        this.id = id;
    }
}

export class CadastroClientes {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.clientes = [];
    }

    async carregarClientes(){
        const resposta = await fetch(this.apiUrl);
        this.clientes = await resposta.json();
        return this.clientes;
    }

    async adicionarCliente(cliente) {
        const resposta = await fetch(this.apiUrl,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cliente)
        });
        return resposta.json();
    }

    async excluirCliente(id) {
        await fetch(`${this.apiUrl}/${id}`, { method: "DELETE"});
        this.clientes = this.clientes.filter(cliente => cliente._id !==id);
    }
}
