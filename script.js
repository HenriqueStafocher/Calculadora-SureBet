// Elementos do DOM
const odd1Input = document.getElementById('odd1');
const odd2Input = document.getElementById('odd2');
const totalInput = document.getElementById('total');

// Elementos de resultado
const bet1Span = document.getElementById('bet1');
const bet2Span = document.getElementById('bet2');
const totalInvestedSpan = document.getElementById('totalInvested');
const profitLossSpan = document.getElementById('profitLoss');
const totalReturnSpan = document.getElementById('totalReturn');
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
    const bet1 = normalizeNumber(totalInput.value); // Agora este é o valor da aposta na Odd 1
    
    // Validação - se não tiver todos os valores, mostrar valores padrão
    if (!odd1 || !odd2 || !bet1 || odd1 < 1.01 || odd2 < 1.01 || bet1 <= 0) {
        bet1Span.textContent = 'R$ 0,00';
        bet2Span.textContent = 'R$ 0,00';
        totalInvestedSpan.textContent = 'R$ 0,00';
        profitLossSpan.textContent = 'R$ 0,00';
        profitLossSpan.className = 'result-value';
        totalReturnSpan.textContent = 'R$ 0,00';
        marginSpan.textContent = '0.00%';
        marginSpan.className = 'result-value';
        return;
    }
    
    // Calcular a aposta na Odd 2 baseada na aposta da Odd 1
    // Para uma surebet perfeita: bet1 * odd1 = bet2 * odd2
    // Portanto: bet2 = (bet1 * odd1) / odd2
    const bet2 = (bet1 * odd1) / odd2;
    
    // Calcular total apostado
    const totalInvested = bet1 + bet2;
    
    // Calcular retornos (ambos devem ser iguais em uma surebet)
    const return1 = bet1 * odd1;
    const return2 = bet2 * odd2;
    const totalReturn = return1; // ou return2, ambos são iguais
    
    // Calcular lucro/prejuízo
    const profitLoss = totalReturn - totalInvested;
    
    // Calcular margem de lucro
    const margin = (profitLoss / totalInvested) * 100;
    
    // Atualizar interface
    bet1Span.textContent = formatCurrency(bet1);
    bet2Span.textContent = formatCurrency(bet2);
    totalInvestedSpan.textContent = formatCurrency(totalInvested);
    profitLossSpan.textContent = formatCurrency(profitLoss);
    profitLossSpan.className = 'result-value ' + (profitLoss > 0 ? 'profit' : profitLoss < 0 ? 'loss' : 'neutral');
    totalReturnSpan.textContent = formatCurrency(totalReturn);
    totalReturnSpan.className = 'result-value';
    marginSpan.textContent = formatPercent(margin);
    marginSpan.className = 'result-value ' + (margin > 0 ? 'profit' : margin < 0 ? 'loss' : 'neutral');
}

// Calcular automaticamente quando os valores mudarem
[odd1Input, odd2Input, totalInput].forEach(input => {
    input.addEventListener('input', calculateSurebet);
    input.addEventListener('paste', () => setTimeout(calculateSurebet, 10));
});

