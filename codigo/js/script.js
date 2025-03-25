function fixCalc() {     
    let numero1 = document.getElementById('num1')
    let numero2 = document.getElementById('num2')
        
    let num1 = Number (numero1.value)
    let num2 = Number (numero2.value)                
    let result = num1 + num2

    document.getElementById("calc-error").innerHTML = "Resultado correto: " + result;
    document.getElementById("calc-error").classList.remove("error");
}

function fixFormValidation() {

    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('e-mail').value;

    if (nome === '' || sobrenome === '' || telefone === '' || email === '')  {
        alert('Preencha os dados!')
        return;
    }

    if (isNaN(telefone)) {
        alert('O telefone não é númerico')        
        return
    } 
    else {
        telefone = parseInt(telefone)
    }            
}

function generateReport() {
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const responsible = document.getElementById("responsible").value;

    const report = `Relatório de Manutenção
    Data: ${date}
    Tipo de Manutenção: Corretiva
    Descrição: ${description}
    Responsável: ${responsible}`;

    alert(report);
}