let carrinho = JSON.parse(localStorage.getItem("carrinhoPrintShirt") || "[]");
let produtoAtual = {
    id: "empresas",
    nome: "Empresas e Eventos",
    imagem: "assets/camisetas-empresas.jpg",
    cor: "Branco",
    tamanho: "M",
    personalizacao: "Com Personalização",
    quantidade: 5
};

const dadosProdutos = {
    empresas: {
        nome: "Empresas e Eventos",
        imagem: "assets/camisetas-empresas.jpg",
        minQtd: 5,
        padraoQtd: 5,
        descricao: "Preço promocional: Pedido mínimo de 5 camisas por R$ 40,00 cada. Cada camisa adicional acima de 5 custará apenas R$ 35,00. Promoção válida mediante apresentação do CNPJ da empresa."
    },
    basica: {
        nome: "Camiseta Básica Individual",
        imagem: "assets/camiseta.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Camiseta 100% algodão penteado macio de alta qualidade, pronta para receber sua personalização com acabamento profissional."
    },
    moletom: {
        nome: "Moletom Canguru Premium",
        imagem: "assets/moletom.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Moletom flanelado encorpado com capuz e bolso frontal canguru. Confortável, quentinho e perfeito para personalização."
    },
    oversized: {
        nome: "Camiseta Oversized Streetwear",
        imagem: "assets/oversized.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Modelagem ampla streetwear em algodão 240g de alta gramatura, com ombros caídos e gola grossa canelada."
    },
    polo: {
        nome: "Camisa Polo Tradicional",
        imagem: "assets/polo.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Camisa polo clássica em malha piquet estruturada e elegante. Ideal para uniformes corporativos e uso profissional."
    },
    regata: {
        nome: "Regata Dry-Fit Esportiva",
        imagem: "assets/regata.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Regata em malha dry-fit respirável e de secagem rápida, com costuras reforçadas para treinos e atividades esportivas."
    },
    caneca: {
        nome: "Caneca de Cerâmica",
        imagem: "assets/caneca.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Caneca branca resinada em cerâmica de alta qualidade, ideal para personalizar com logo, frases ou artes especiais."
    },
    taca: {
        nome: "Taça de Gin Personalizada",
        imagem: "assets/taca.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Taça de gin em acrílico premium transparente com acabamento brilhante, perfeita para festas, celebrações e brindes."
    },
    copo: {
        nome: "Copo Térmico com Tampa",
        imagem: "assets/copo.jpg",
        minQtd: 1,
        padraoQtd: 1,
        descricao: "Copo térmico em aço inoxidável com parede dupla e isolamento a vácuo, preservando a temperatura da sua bebida por horas."
    }
};

const precosUnitarios = {
    basica: 45,
    moletom: 119,
    oversized: 59,
    polo: 65,
    regata: 42,
    caneca: 35,
    taca: 25,
    copo: 69
};

const mapaCores = {
    "Branco": { bg: "#ffffff", border: "#cccccc" },
    "Preto": { bg: "#1a1a2e", border: "#333333" },
    "Azul": { bg: "#2563eb", border: "#1d4ed8" },
    "Cinza": { bg: "#6b7280", border: "#4b5563" },
    "Vermelho": { bg: "#dc2626", border: "#b91c1c" }
};

function atualizarIndicadorCor(cor) {
    const ponto = document.getElementById("preview-ponto-cor");
    const texto = document.getElementById("preview-legenda-texto");
    if (!ponto || !texto) return;

    const infoCor = mapaCores[cor] || { bg: "#ffffff", border: "#cccccc" };
    ponto.style.backgroundColor = infoCor.bg;
    ponto.style.borderColor = infoCor.border;

    if (cor === "Branco") {
        texto.textContent = "Visualização da Peça";
    } else {
        texto.textContent = "Cor Selecionada: " + cor;
    }
}

const btnTema = document.getElementById("btn-tema");
const iconeTema = document.getElementById("icone-tema");

function aplicarTema(escuro) {
    if (escuro) {
        document.body.classList.add("modo-noturno");
        if (btnTema) {
            btnTema.title = "Ativar Modo Claro";
        }
    } else {
        document.body.classList.remove("modo-noturno");
        if (btnTema) {
            btnTema.title = "Ativar Modo Noturno";
        }
    }
}

const temaSalvo = localStorage.getItem("modoNoturnoPrintShirt") === "true";
aplicarTema(temaSalvo);

if (btnTema) {
    btnTema.addEventListener("click", function() {
        const modoAtual = document.body.classList.contains("modo-noturno");
        const novoModo = !modoAtual;
        aplicarTema(novoModo);
        localStorage.setItem("modoNoturnoPrintShirt", novoModo);
    });
}

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
const gradeTamanho = document.getElementById("grade-tamanho");
const btnsTamanho = document.querySelectorAll(".btn-tamanho");
const campoPersonalizacao = document.getElementById("campo-personalizacao");
const btnsPersonalizacao = document.querySelectorAll(".btn-personalizacao");
const btnAddCarrinho = document.getElementById("btn-add-carrinho");

const modalResumo = document.getElementById("modal-orcamento");
const modalResumoTexto = document.getElementById("modal-texto");
const btnCopiarResumo = document.getElementById("btn-copiar");
const btnFecharResumo = document.getElementById("btn-fechar-modal");

const cardsProdutos = document.querySelectorAll(".card-clicavel");
const menuToggle = document.getElementById("menu-toggle");
const menuNav = document.getElementById("menu-nav");
const linksNav = document.querySelectorAll("#menu-nav a");

const gatilhoAdmin = document.getElementById("gatilho-admin");
const modalLoginAdmin = document.getElementById("modal-login-admin");
const btnFecharAdmin = document.getElementById("btn-fechar-admin");
const formLoginAdmin = document.getElementById("form-login-admin");
const adminLoginMsg = document.getElementById("admin-login-msg");

function calcularPreco(prodId, quantidade) {
    if (prodId === "empresas") {
        const qtd = Math.max(5, quantidade);
        return (5 * 40) + ((qtd - 5) * 35);
    }
    const unitario = precosUnitarios[prodId] || 45;
    return unitario * quantidade;
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
    const info = dadosProdutos[prodId] || dadosProdutos.empresas;
    produtoAtual.id = prodId;
    produtoAtual.nome = info.nome;
    produtoAtual.imagem = info.imagem;
    if (modalProdCor) {
        modalProdCor.value = "Branco";
    }
    produtoAtual.cor = "Branco";
    atualizarIndicadorCor("Branco");

    const ehBebida = prodId === "caneca" || prodId === "taca" || prodId === "copo";
    if (ehBebida) {
        if (prodId === "caneca") produtoAtual.tamanho = "325ml";
        if (prodId === "taca") produtoAtual.tamanho = "580ml";
        if (prodId === "copo") produtoAtual.tamanho = "473ml";
    } else {
        produtoAtual.tamanho = "M";
    }

    modalProdNome.textContent = info.nome;
    modalProdDescricao.textContent = info.descricao;
    modalProdImg.src = info.imagem;

    if (prodId === "empresas") {
        if (campoPersonalizacao) {
            campoPersonalizacao.style.display = "none";
        }
        produtoAtual.personalizacao = "Com Personalização (Obrigatório)";
        modalProdQtd.min = "5";
        modalProdQtd.value = "5";
        if (lblProdQtd) {
            lblProdQtd.textContent = "Quantidade (mínimo 5):";
        }
    } else {
        if (campoPersonalizacao) {
            campoPersonalizacao.style.display = "block";
        }
        produtoAtual.personalizacao = "Com Personalização";
        btnsPersonalizacao.forEach(function(b) {
            if (b.getAttribute("data-personalizacao") === "Com Personalização") {
                b.classList.add("ativo");
            } else {
                b.classList.remove("ativo");
            }
        });
        modalProdQtd.min = "1";
        modalProdQtd.value = "1";
        if (lblProdQtd) {
            lblProdQtd.textContent = "Quantidade:";
        }
    }

    btnsTamanho.forEach(function(btn) {
        const tam = btn.getAttribute("data-tamanho");
        if (ehBebida) {
            if (tam === "P") {
                btn.textContent = produtoAtual.tamanho;
                btn.classList.add("ativo");
            } else {
                btn.style.display = "none";
            }
        } else {
            btn.style.display = "block";
            btn.textContent = tam;
            if (tam === "M") {
                btn.classList.add("ativo");
            } else {
                btn.classList.remove("ativo");
            }
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

btnsPersonalizacao.forEach(function(btn) {
    btn.addEventListener("click", function() {
        btnsPersonalizacao.forEach(function(b) {
            b.classList.remove("ativo");
        });
        btn.classList.add("ativo");
        produtoAtual.personalizacao = btn.getAttribute("data-personalizacao");
    });
});

if (modalProdCor) {
    modalProdCor.addEventListener("change", function() {
        produtoAtual.cor = modalProdCor.value;
        atualizarIndicadorCor(modalProdCor.value);
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
            personalizacao: produtoAtual.personalizacao || "Com Personalização",
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

    localStorage.setItem("carrinhoPrintShirt", JSON.stringify(carrinho));

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
            const persRotulo = item.personalizacao ? " | " + item.personalizacao : "";

            const divItem = document.createElement("div");
            divItem.className = "carrinho-item";
            divItem.innerHTML = '<img src="' + item.imagem + '" class="carrinho-item-img" alt="' + item.nome + '">' +
                '<div class="carrinho-item-detalhes">' +
                    '<div class="carrinho-item-titulo">' + item.nome + '</div>' +
                    '<div class="carrinho-item-meta">Cor: ' + item.cor + ' | Tam: ' + item.tamanho + persRotulo + ' | ' + rotuloQtd + '</div>' +
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
            const persTexto = item.personalizacao ? " | " + item.personalizacao : "";
            textoPedido += (i + 1) + ". " + item.nome + "\n" +
                "   Cor: " + item.cor + " | Tamanho: " + item.tamanho + persTexto + "\n" +
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

//Chamar Whatsapp
const btnWhatsapp = document.getElementById("btn-whatsapp");
if (btnWhatsapp && modalResumoTexto) {
    btnWhatsapp.addEventListener("click", function() {
        const telefone = "5519991018291";
        const link = "https://wa.me/" + telefone + "?text=" + encodeURIComponent(modalResumoTexto.value);
        window.open(link, "_blank");
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

if (gatilhoAdmin && modalLoginAdmin) {
    gatilhoAdmin.addEventListener("click", function(e) {
        e.stopPropagation();
        if (modalCarrinho) {
            modalCarrinho.classList.remove("ativo");
        }
        modalLoginAdmin.classList.add("ativo");
        const inputUsuario = document.getElementById("admin-usuario");
        if (inputUsuario) {
            inputUsuario.focus();
        }
    });
}

if (btnFecharAdmin && modalLoginAdmin) {
    btnFecharAdmin.addEventListener("click", function() {
        modalLoginAdmin.classList.remove("ativo");
        if (adminLoginMsg) {
            adminLoginMsg.textContent = "";
        }
    });
}

if (modalLoginAdmin) {
    modalLoginAdmin.addEventListener("click", function(e) {
        if (e.target === modalLoginAdmin) {
            modalLoginAdmin.classList.remove("ativo");
            if (adminLoginMsg) {
                adminLoginMsg.textContent = "";
            }
        }
    });
}

if (formLoginAdmin) {
    formLoginAdmin.addEventListener("submit", function(e) {
        e.preventDefault();
        const usuario = document.getElementById("admin-usuario").value;
        const senha = document.getElementById("admin-senha").value;

        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario: usuario, senha: senha })
        }).then(function(resp) {
            if (resp.ok) {
                return resp.json().then(function(data) {
                    if (adminLoginMsg) {
                        adminLoginMsg.style.color = "#27ae60";
                        adminLoginMsg.textContent = "Login autorizado com sucesso!";
                    }
                });
            } else {
                if (adminLoginMsg) {
                    adminLoginMsg.style.color = "#e94560";
                    adminLoginMsg.textContent = "Usuário ou senha incorretos.";
                }
            }
        }).catch(function() {
            if (adminLoginMsg) {
                adminLoginMsg.style.color = "#e94560";
                adminLoginMsg.textContent = "Aguardando configuração do endpoint de autenticação.";
            }
        });
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