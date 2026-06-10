/* ==========================================================================
   1. SELEÇÃO DE ELEMENTOS DO DOM (document.querySelector)
   ========================================================================== */
const botaoCalcular = document.querySelector('#btn-calcular');
const inputVolume = document.querySelector('#input-volume');
const inputArea = document.querySelector('#input-area');

const painelErro = document.querySelector('#mensagem-erro');
const painelResultado = document.querySelector('#resultado');
const textoResultado = document.querySelector('#texto-resultado');

/* ==========================================================================
   2. ESCUTADOR DE EVENTOS (addEventListener)
   ========================================================================== */
botaoCalcular.addEventListener('click', processarDados);

/* ==========================================================================
   3. FUNÇÃO PRINCIPAL DE PROCESSAMENTO E VALIDAÇÃO ESTRITA
   ========================================================================== */
function processarDados() {
    // Captura os valores digitados e os converte para números decimais (float)
    const volume = parseFloat(inputVolume.value);
    const area = parseFloat(inputArea.value);

    // Reset de estados: esconde as caixas de resultado/erro anteriores antes do novo cálculo
    ocultarAlertas();

    /* --- VALIDAÇÃO ESTRITA (Proteção contra bugs e dados inválidos) --- */
    
    // Verifica se os campos estão vazios ou não são números válidos (NaN)
    if (isNaN(volume) || isNaN(area)) {
        exibirErro("Por favor, preencha todos os campos numéricos antes de calcular.");
        return; // Interrompe a execução do código imediatamente
    }

    // Verifica se o usuário inseriu números negativos
    if (volume < 0 || area < 0) {
        exibirErro("Atenção! Não são permitidos valores negativos para volume de água ou área da propriedade.");
        return;
    }

    // Verifica divisões por zero (exemplo: área igual a zero)
    if (area === 0) {
        exibirErro("A área cultivada deve ser maior do que zero para podermos fazer o cálculo.");
        return;
    }

    /* --- CÁLCULO DA EFICIÊNCIA HÍDRICA (Lógica de Negócio) --- */
    // Calcula quantos litros de água foram gastos por hectare
    const litrosPorHectare = volume / area;

    /* --- RENDERIZAÇÃO ELEGANTE DIRETAMENTE NA TELA --- */
    exibirResultado(litrosPorHectare, area);
}

/* ==========================================================================
   4. FUNÇÕES AUXILIARES DE RENDERIZAÇÃO (UI/UX)
   ========================================================================== */

// Renderiza uma mensagem de erro amigável na tela do usuário
function exibirErro(mensagem) {
    painelErro.textContent = `⚠️ Erro: ${mensagem}`;
    painelErro.className = "erro-visivel"; // Ativa a classe CSS criada no bloco anterior
}

// Renderiza o sucesso do cálculo e traz uma mensagem educativa
function exibirResultado(resultadoCalculado, areaPropriedade) {
    // Formata o número para o padrão de leitura brasileiro (ex: 25.000,00)
    const resultadoFormatado = resultadoCalculado.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
    
    let recomendacaoEco = "";
    
    // Pequena árvore de decisão lógica baseada em sustentabilidade e pesquisa do agro
    if (resultadoCalculated <= 20000) {
        recomendacaoEco = "Excelente! Seu índice está dentro dos padrões de alta eficiência hídrica, similar às tecnologias de gotejamento de referência internacional.";
    } else {
        recomendacaoEco = "Seu índice está elevado. Considere avaliar métodos de manejo integrado, sensores de umidade no solo ou técnicas de reaproveitamento de água para evitar o desperdício.";
    }

    textoResultado.innerHTML = `O consumo médio na sua lavoura é de <strong>${resultadoFormatado} litros por hectare</strong>.<br><br>🌱 <strong>Análise de Sustentabilidade:</strong> ${recomendacaoEco}`;
    
    painelResultado.className = "resultado-visivel"; // Ativa o painel verde do CSS
}

// Limpa a tela para o próximo cálculo
function ocultarAlertas() {
    painelErro.className = "erro-oculto";
    painelResultado.className = "resultado-oculto";
}
