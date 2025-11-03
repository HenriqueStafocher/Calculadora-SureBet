// Elementos do DOM
const odd1Input = document.getElementById('odd1');
const odd2Input = document.getElementById('odd2');
const totalInput = document.getElementById('total');

// Elementos de resultado
const bet1Span = document.getElementById('bet1');
const bet2Span = document.getElementById('bet2');
const marginSpan = document.getElementById('margin');

// Função para formatar moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para formatar porcentagem
function formatPercent(value) {
    return value.toFixed(2) + '%';
}

// Função para normalizar número (aceita vírgula ou ponto)
function normalizeNumber(value) {
    if (!value || value === '') return null;
    // Substitui vírgula por ponto e remove espaços
    const normalized = value.trim().replace(',', '.');
    const num = parseFloat(normalized);
    return isNaN(num) ? null : num;
}

// Função principal de cálculo
function calculateSurebet() {
    const odd1 = normalizeNumber(odd1Input.value);
    const odd2 = normalizeNumber(odd2Input.value);
    const total = normalizeNumber(totalInput.value);
    
    // Validação - se não tiver todos os valores, mostrar valores padrão
    if (!odd1 || !odd2 || !total || odd1 < 1.01 || odd2 < 1.01 || total <= 0) {
        bet1Span.textContent = 'R$ 0,00';
        bet2Span.textContent = 'R$ 0,00';
        marginSpan.textContent = '0.00%';
        marginSpan.className = 'result-value';
        return;
    }
    
    // Calcular probabilidades implícitas
    const prob1 = 1 / odd1;
    const prob2 = 1 / odd2;
    const totalProb = prob1 + prob2;
    
    // Calcular distribuição das apostas
    const bet1 = (prob1 / totalProb) * total;
    const bet2 = (prob2 / totalProb) * total;
    const totalInvested = bet1 + bet2;
    
    // Calcular retornos possíveis
    const return1 = bet1 * odd1;
    const return2 = bet2 * odd2;
    
    // Calcular lucro/prejuízo (ambos os retornos devem ser iguais em uma surebet perfeita)
    // Vamos usar o menor retorno para calcular o lucro/prejuízo
    const minReturn = Math.min(return1, return2);
    const profitLoss = minReturn - totalInvested;
    
    // Calcular margem de lucro
    const margin = (profitLoss / totalInvested) * 100;
    
    // Atualizar interface
    bet1Span.textContent = formatCurrency(bet1);
    bet2Span.textContent = formatCurrency(bet2);
    marginSpan.textContent = formatPercent(margin);
    marginSpan.className = 'result-value ' + (margin > 0 ? 'profit' : margin < 0 ? 'loss' : 'neutral');
}

// Calcular automaticamente quando os valores mudarem
[odd1Input, odd2Input, totalInput].forEach(input => {
    input.addEventListener('input', calculateSurebet);
    input.addEventListener('paste', () => setTimeout(calculateSurebet, 10));
});

