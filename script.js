let carrinho = [];
let produtoAtual = {
    id: "basica",
    nome: "Camiseta Básica Individual",
    imagem: "assets/camiseta.jpg",
    cor: "Preto",
    tamanho: "M",
    quantidade: 1
};

const dadosProdutos = {
    basica: {
        nome: "Camiseta Básica Individual",
        imagem: "assets/camiseta.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "1 camiseta 100% algodão penteado de alta qualidade, personalizada com sua arte, foto ou frase exclusiva."
    },
    kit: {
        nome: "Kit 3 Camisetas Personalizadas",
        imagem: "assets/camiseta3.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Kit com 3 camisetas personalizadas por R$ 120,00 à vista (R$ 40,00 por camiseta). Perfeito para grupos e presentes."
    },
    empresas: {
        nome: "Empresas e Eventos",
        imagem: "assets/camisetas-empresas.jpg",
        minQtd: 5,
        padraoQtd: 5,
        descricao: "Preço promocional: Pedido mínimo de 5 camisas por R$ 40,00 cada. Cada camisa adicional acima de 5 custará apenas R$ 35,00. Ideal para equipes, empresas, equipes e formaturas."
    }
};

const btnCarrinho = document.getElementById("btn-carrinho");
const carrinhoContador = document.getElementById("carrinho-contador");
const modalCarrinho = document.getElementById("modal-carrinho");
const btnFecharCarrinho = document.getElementById("btn-fechar-carrinho");
const carrinhoLista = document.getElementById("carrinho-lista");
const carrinhoTotal = document.getElementById("carrinho-total");
const btnFinalizarPedido = document.getElementById("btn-finalizar-pedido");

const modalProduto = document.getElementById("modal-produto");
const btnFecharModalProduto = document.getElementById("btn-fechar-modal-produto");
const modalProdNome = document.getElementById("modal-prod-nome");
const modalProdPreco = document.getElementById("modal-prod-preco");
const modalProdDescricao = document.getElementById("modal-prod-descricao");
const modalProdImg = document.getElementById("modal-prod-img");
const modalProdCor = document.getElementById("modal-prod-cor");
const modalProdQtd = document.getElementById("modal-prod-qtd");
const lblProdQtd = document.getElementById("lbl-prod-qtd");
const btnsTamanho = document.querySelectorAll(".btn-tamanho");
const btnAddCarrinho = document.getElementById("btn-add-carrinho");

const modalResumo = document.getElementById("modal-orcamento");
const modalResumoTexto = document.getElementById("modal-texto");
const btnCopiarResumo = document.getElementById("btn-copiar");
const btnFecharResumo = document.getElementById("btn-fechar-modal");

const cardsProdutos = document.querySelectorAll(".card-clicavel");
const menuToggle = document.getElementById("menu-toggle");
const menuNav = document.getElementById("menu-nav");
const linksNav = document.querySelectorAll("#menu-nav a");

function calcularPreco(prodId, quantidade) {
    if (prodId === "empresas") {
        const qtd = Math.max(5, quantidade);
        return (5 * 40) + ((qtd - 5) * 35);
    }
    if (prodId === "kit") {
        return 120 * quantidade;
    }
    return 45 * quantidade;
}

function atualizarPrecoModal() {
    let qtd = parseInt(modalProdQtd.value, 10);
    const min = produtoAtual.id === "empresas" ? 5 : 1;

    if (isNaN(qtd) || qtd < min) {
        qtd = min;
        modalProdQtd.value = min;
    }

    produtoAtual.quantidade = qtd;
    const valorCalculado = calcularPreco(produtoAtual.id, qtd);
    modalProdPreco.textContent = "R$ " + valorCalculado.toFixed(2).replace(".", ",");
}

function abrirModalProduto(prodId) {
    const info = dadosProdutos[prodId] || dadosProdutos.basica;
    produtoAtual.id = prodId;
    produtoAtual.nome = info.nome;
    produtoAtual.imagem = info.imagem;
    produtoAtual.cor = modalProdCor.value;
    produtoAtual.tamanho = "M";

    modalProdNome.textContent = info.nome;
    modalProdDescricao.textContent = info.descricao;
    modalProdImg.src = info.imagem;

    if (prodId === "empresas") {
        modalProdQtd.min = "5";
        modalProdQtd.value = "5";
        if (lblProdQtd) {
            lblProdQtd.textContent = "Quantidade de camisas (mínimo 5):";
        }
    } else {
        modalProdQtd.min = "1";
        modalProdQtd.value = "1";
        if (lblProdQtd) {
            lblProdQtd.textContent = "Quantidade:";
        }
    }

    btnsTamanho.forEach(function(btn) {
        if (btn.getAttribute("data-tamanho") === "M") {
            btn.classList.add("ativo");
        } else {
            btn.classList.remove("ativo");
        }
    });

    atualizarPrecoModal();
    modalProduto.classList.add("ativo");
}

cardsProdutos.forEach(function(card) {
    card.addEventListener("click", function() {
        const prodId = card.getAttribute("data-id");
        abrirModalProduto(prodId);
    });
});

btnsTamanho.forEach(function(btn) {
    btn.addEventListener("click", function() {
        btnsTamanho.forEach(function(b) {
            b.classList.remove("ativo");
        });
        btn.classList.add("ativo");
        produtoAtual.tamanho = btn.getAttribute("data-tamanho");
    });
});

if (modalProdCor) {
    modalProdCor.addEventListener("change", function() {
        produtoAtual.cor = modalProdCor.value;
    });
}

if (modalProdQtd) {
    modalProdQtd.addEventListener("input", atualizarPrecoModal);
    modalProdQtd.addEventListener("change", atualizarPrecoModal);
}

if (btnAddCarrinho) {
    btnAddCarrinho.addEventListener("click", function() {
        let qtd = parseInt(modalProdQtd.value, 10);
        const min = produtoAtual.id === "empresas" ? 5 : 1;

        if (isNaN(qtd) || qtd < min) {
            qtd = min;
        }

        const valorItem = calcularPreco(produtoAtual.id, qtd);

        carrinho.push({
            id: produtoAtual.id,
            nome: produtoAtual.nome,
            preco: valorItem,
            imagem: produtoAtual.imagem,
            cor: modalProdCor.value,
            tamanho: produtoAtual.tamanho || "M",
            quantidade: qtd
        });

        atualizarCarrinho();
        modalProduto.classList.remove("ativo");
        abrirCarrinho();
    });
}

function atualizarCarrinho() {
    let totalItens = 0;
    let totalValor = 0;

    carrinhoLista.innerHTML = "";

    if (carrinho.length === 0) {
        carrinhoLista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        if (btnFinalizarPedido) {
            btnFinalizarPedido.style.display = "none";
        }
    } else {
        if (btnFinalizarPedido) {
            btnFinalizarPedido.style.display = "block";
        }

        carrinho.forEach(function(item, index) {
            totalItens += item.quantidade;
            totalValor += item.preco;

            const rotuloQtd = item.id === "empresas" ? item.quantidade + " camisas" : "Qtd: " + item.quantidade;

            const divItem = document.createElement("div");
            divItem.className = "carrinho-item";
            divItem.innerHTML = '<img src="' + item.imagem + '" class="carrinho-item-img" alt="' + item.nome + '">' +
                '<div class="carrinho-item-detalhes">' +
                    '<div class="carrinho-item-titulo">' + item.nome + '</div>' +
                    '<div class="carrinho-item-meta">Cor: ' + item.cor + ' | Tam: ' + item.tamanho + ' | ' + rotuloQtd + '</div>' +
                    '<div class="carrinho-item-preco">R$ ' + item.preco.toFixed(2).replace(".", ",") + ' à vista</div>' +
                '</div>' +
                '<button type="button" class="btn-remover-item" data-index="' + index + '" aria-label="Remover item">&times;</button>';

            carrinhoLista.appendChild(divItem);
        });
    }

    carrinhoContador.textContent = totalItens;
    carrinhoTotal.textContent = "R$ " + totalValor.toFixed(2).replace(".", ",");

    const btnsRemover = document.querySelectorAll(".btn-remover-item");
    btnsRemover.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute("data-index"), 10);
            carrinho.splice(idx, 1);
            atualizarCarrinho();
        });
    });
}

function abrirCarrinho() {
    modalCarrinho.classList.add("ativo");
}

if (btnCarrinho) {
    btnCarrinho.addEventListener("click", abrirCarrinho);
}

if (btnFecharCarrinho) {
    btnFecharCarrinho.addEventListener("click", function() {
        modalCarrinho.classList.remove("ativo");
    });
}

if (btnFecharModalProduto) {
    btnFecharModalProduto.addEventListener("click", function() {
        modalProduto.classList.remove("ativo");
    });
}

if (modalProduto) {
    modalProduto.addEventListener("click", function(e) {
        if (e.target === modalProduto) {
            modalProduto.classList.remove("ativo");
        }
    });
}

if (modalCarrinho) {
    modalCarrinho.addEventListener("click", function(e) {
        if (e.target === modalCarrinho) {
            modalCarrinho.classList.remove("ativo");
        }
    });
}

if (btnFinalizarPedido) {
    btnFinalizarPedido.addEventListener("click", function() {
        if (carrinho.length === 0) return;

        let textoPedido = "Olá! Gostaria de confirmar meu pedido na PrintShirt (Pagamento à vista):\n\n";
        let valorTotal = 0;

        carrinho.forEach(function(item, i) {
            valorTotal += item.preco;
            const qtdTexto = item.id === "empresas" ? item.quantidade + " camisas" : item.quantidade + " un";
            textoPedido += (i + 1) + ". " + item.nome + "\n" +
                "   Cor: " + item.cor + " | Tamanho: " + item.tamanho + "\n" +
                "   Quantidade: " + qtdTexto + " | Subtotal: R$ " + item.preco.toFixed(2).replace(".", ",") + "\n\n";
        });

        textoPedido += "Valor Total: R$ " + valorTotal.toFixed(2).replace(".", ",") + " à vista\n\n" +
            "Como podemos prosseguir?";

        modalResumoTexto.value = textoPedido;
        modalCarrinho.classList.remove("ativo");
        modalResumo.classList.add("ativo");
    });
}

if (btnCopiarResumo && modalResumoTexto) {
    btnCopiarResumo.addEventListener("click", function() {
        modalResumoTexto.select();
        modalResumoTexto.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(modalResumoTexto.value);
        btnCopiarResumo.textContent = "Copiado!";
        setTimeout(function() {
            btnCopiarResumo.textContent = "Copiar Mensagem";
        }, 2000);
    });
}

if (btnFecharResumo && modalResumo) {
    btnFecharResumo.addEventListener("click", function() {
        modalResumo.classList.remove("ativo");
    });
}

if (modalResumo) {
    modalResumo.addEventListener("click", function(e) {
        if (e.target === modalResumo) {
            modalResumo.classList.remove("ativo");
        }
    });
}

if (menuToggle && menuNav) {
    menuToggle.addEventListener("click", function() {
        menuNav.classList.toggle("ativo");
    });

    linksNav.forEach(function(link) {
        link.addEventListener("click", function() {
            menuNav.classList.remove("ativo");
        });
    });
}

atualizarCarrinho();
