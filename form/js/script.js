function adicionarCliente() {
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

    if (nome === '' || telefone === '' || email === '')  {
        alert('Preencha todos os campos!');
        return;
    }

    if (isNaN(telefone)) 
    {
        alert('O telefone não é númerico')        
        return
    } 
    else
    {
        telefone = parseInt(telefone)
    }

    let tabela = document.getElementById('listaClientes');
    let novaLinha = tabela.insertRow();

    novaLinha.insertCell(0).innerText = nome;
    novaLinha.insertCell(1).innerText = telefone;
    novaLinha.insertCell(2).innerText = email;

    let acaoCell = novaLinha.insertCell(3);
    let botaoExcluir = document.createElement('button');

    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.classList.add('btn-excluir');

    botaoExcluir.onclick = function () {
        let confirmacao = confirm("Você deseja excluir esse dado?")

        if (confirmacao) {
            alert('Dado excluído com sucesso')
            tabela.deleteRow(novaLinha.rowIndex - 1);
        }         
    };

    acaoCell.appendChild(botaoExcluir);

    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
}