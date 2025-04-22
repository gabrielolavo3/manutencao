const usuariosKey = "acessoriosNorte_usuarios";
const loginKey = "acessoriosNorte_logado";
const produtosKey = "acessoriosNorte_produtos";
let produtos = JSON.parse(localStorage.getItem(produtosKey)) || [];

function mostrar(tela) {
  document.getElementById("telaLogin").style.display = tela === "login" ? "block" : "none";
  document.getElementById("telaCadastro").style.display = tela === "cadastro" ? "block" : "none";
  document.getElementById("telaDashboard").style.display = tela === "dashboard" ? "block" : "none";
  document.getElementById("telaCliente").style.display = tela === "cliente" ? "block" : "none";
}

function cadastrar() {
  const usuario = document.getElementById("cadUsuario").value;
  const senha = document.getElementById("cadSenha").value;
  const perfil = document.getElementById("cadPerfil").value;
  const usuarios = JSON.parse(localStorage.getItem(usuariosKey)) || [];

  if (!usuario || !senha || !perfil) {
    alert("Preencha todos os campos!");
    return;
  }

  if (usuarios.find(u => u.usuario === usuario)) {
    alert("Usuário já existe!");
    return;
  }

  usuarios.push({ usuario, senha, perfil });
  localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
  alert("Usuário cadastrado com sucesso!");
  mostrar("login");
}

function login() {
  const usuario = document.getElementById("loginUsuario").value;
  const senha = document.getElementById("loginSenha").value;
  const usuarios = JSON.parse(localStorage.getItem(usuariosKey)) || [];
  const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (encontrado) {
    localStorage.setItem(loginKey, JSON.stringify(encontrado));
    if (encontrado.perfil === "funcionario") {
      mostrar("dashboard");
      renderizarTabela();
    } else if (encontrado.perfil === "cliente") {
      mostrar("cliente");
    }
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function logout() {
  localStorage.removeItem(loginKey);
  mostrar("login");
}

function salvarProduto() {
  const id = document.getElementById("idProduto").value;
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const quantidadeAlteracao = document.getElementById("quantidade").value;

  // Verificações para não aceitar valores nulos nos campos
  if (nome == "" || preco == "") {
    alert("Preencha nome e preço!");
    return;
  }

  if (id === "") {
    if (quantidadeAlteracao <= 0) {
      alert("Informe a quantidade do produto.");
      return;
    }
    produtos.push({ nome, preco, quantidade: quantidadeAlteracao });
  } else {
    let produto = produtos[id];
    let novaQuantidade = parseInt(produto.quantidade); // Converte a quantidade atual de itens para um número
    let quantInserida = parseInt(quantidadeAlteracao); // Converte o valor inserido para alteração
    
    // Verifica se o valor inserido é diferente de 0 e pergunta o tipo de operação
    if (quantInserida !== 0) {
      const operacao = prompt("Deseja adicionar (A) ou remover (R) essa quantidade?").toLowerCase();

    // Operações para adicionar ou remover a quantidade inserida
      if (operacao === 'a') {
        novaQuantidade += quantInserida;
      } else if (operacao === 'r') {
        novaQuantidade -= quantInserida;        
      } 
    }
    
    // Atualiza o array, atualizando a quantidade de itens
    produtos[id] = { nome, preco, quantidade: novaQuantidade };  
}

  // Limpa os campos do formulário
  localStorage.setItem(produtosKey, JSON.stringify(produtos));
  document.getElementById("idProduto").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("quantidade").value = "";  
  renderizarTabela();
}

function editar(index) {
  const p = produtos[index];
  document.getElementById("idProduto").value = index;
  document.getElementById("nome").value = p.nome;
  document.getElementById("preco").value = p.preco;  
  document.getElementById("quantidade").value = ""; // Valor vazio para incluir o valor adicionado ou removido
}

function excluir(index) {
  if (confirm("Deseja excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem(produtosKey, JSON.stringify(produtos));
    renderizarTabela();
  }
}

function renderizarTabela() {
  const tabela = document.getElementById("tabelaProdutos");
  tabela.innerHTML = "";
  produtos.forEach((p, i) => {
    tabela.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
        <td>${p.quantidade}</td>
        <td>
          <button onclick="editar(${i})">✏️</button>
          <button onclick="excluir(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function mostrarImagem(tipo) {
  const imagens = {
    anel: 'https://joiasgold.vteximg.com.br/arquivos/ids/237850-1000-1000/anel-ouro-dezoito-kilates-formatura-gota-zirconia-azul-branca-joiasgold.jpg?v=638145806228500000',
    brinco: 'https://fluiartejoias.vteximg.com.br/arquivos/ids/156633-550-550/B26835P_fluiarte_joias.jpg?v=637769853749800000',
    colar: 'https://www.joiasprime.com.br/upload/produto/imagem/b_colar-ouro-18k-feminino-ponto-de-luz-40cm-1-00-grama-3.webp',
    pulseira: 'https://www.safira.com.br/cdn/imagens/produtos/det/pulseira-de-ouro-infantil-com-bolinhas-2905e917798e49e17d28b80ea18509cd.jpg'
  };

  const areaImagem = document.getElementById('areaImagem');
  areaImagem.innerHTML = '';

  const img = document.createElement('img');
  img.src = imagens[tipo];
  img.alt = `Imagem de ${tipo}`;
  
  areaImagem.appendChild(img);
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();
  const hora = String(dataAtual.getHours()).padStart(2, '0');
  const minuto = String(dataAtual.getMinutes()).padStart(2, '0');
  const dataFormatada = `${dia}/${mes}/${ano}`;
  const HoraFormatada = `${hora}:${minuto}`;
  doc.text("Relatório de Produtos - Acessórios Norte", 10, 10);

  doc.text('Data do relatório:', 10, 20);
  doc.text(dataFormatada, 70, 20);

  doc.text('Hora do relatório:', 10, 30);
  doc.text(HoraFormatada, 70, 30);

  
  let y = 40;
  doc.text("Nome", 10, y);
  doc.text("Valor (R$)", 90, y);
  doc.text("Qtd", 140, y);

  y += 10; 

  
  produtos.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.nome}`, 10, y);
      doc.text(`R$ ${parseFloat(p.preco).toFixed(2)}`, 90, y);  // com 2 casas decimais
      doc.text(`${p.quantidade}`, 140, y);
      y += 10;
  });

  doc.save("relatorio_acessorios_norte.pdf");
}

window.onload = () => {
  const user = JSON.parse(localStorage.getItem(loginKey));
  if (user) {
    if (user.perfil === "funcionario") {
      mostrar("dashboard");
      renderizarTabela();
    } else if (user.perfil === "cliente") {
      mostrar("cliente");
    }
  } else {
    mostrar("login");
  }
}