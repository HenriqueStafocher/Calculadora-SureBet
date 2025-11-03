// Elementos do DOM
const odd1Input = document.getElementById('odd1');
const odd2Input = document.getElementById('odd2');
const totalInput = document.getElementById('total');
const calculateBtn = document.getElementById('calculateBtn');
const resultsDiv = document.getElementById('results');

// Elementos de resultado
const bet1Span = document.getElementById('bet1');
const bet2Span = document.getElementById('bet2');
const marginSpan = document.getElementById('margin');
const totalValueSpan = document.getElementById('totalValue');

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
    
    // Validação
    if (!odd1 || !odd2 || !total || odd1 < 1.01 || odd2 < 1.01 || total <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos.\nOdds devem ser maiores que 1.00 e o valor total maior que zero.');
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
    
    // Calcular valor total da operação (apostado + lucro)
    const totalValue = totalInvested + profitLoss;
    
    // Atualizar interface
    bet1Span.textContent = formatCurrency(bet1);
    bet2Span.textContent = formatCurrency(bet2);
    marginSpan.textContent = formatPercent(margin);
    marginSpan.className = 'value ' + (margin > 0 ? 'profit' : margin < 0 ? 'loss' : 'neutral');
    totalValueSpan.textContent = formatCurrency(totalValue);
    totalValueSpan.className = 'value ' + (profitLoss > 0 ? 'profit' : profitLoss < 0 ? 'loss' : 'neutral');
    
    // Mostrar resultados
    resultsDiv.classList.remove('hidden');
    
    // Scroll suave para os resultados
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Event listeners
calculateBtn.addEventListener('click', calculateSurebet);

// Permitir calcular com Enter
[odd1Input, odd2Input, totalInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateSurebet();
        }
    });
});

// Calcular automaticamente quando os valores mudarem (opcional)
// Descomente as linhas abaixo se quiser cálculo automático ao digitar
/*
[odd1Input, odd2Input, totalInput].forEach(input => {
    input.addEventListener('input', () => {
        if (odd1Input.value && odd2Input.value && totalInput.value) {
            calculateSurebet();
        }
    });
});
*/

