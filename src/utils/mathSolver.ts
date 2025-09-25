import { MathProblem } from '../types/chat';

export class MathSolver {
  // Resolve expressões matemáticas básicas
  static solveMathExpression(expression: string): MathProblem | null {
    try {
      // Remove espaços e substitui símbolos
      const cleanExpression = expression
        .replace(/\s/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/x/g, '*');

      // Verifica se é uma expressão matemática válida
      if (!/^[0-9+\-*/().,]+$/.test(cleanExpression)) {
        return null;
      }

      // Calcula o resultado (usando Function para segurança)
      const result = Function('"use strict"; return (' + cleanExpression + ')')();
      
      if (isNaN(result) || !isFinite(result)) {
        return null;
      }

      return {
        expression: expression,
        result: Number(result.toFixed(8)),
        steps: [`${expression} = ${Number(result.toFixed(8))}`]
      };
    } catch (error) {
      return null;
    }
  }

  // Detecta se a mensagem contém uma pergunta matemática
  static isMathQuestion(message: string): boolean {
    const mathKeywords = [
      'calcular', 'quanto', 'soma', 'subtração', 'multiplicação', 'divisão',
      'equação', 'resolver', 'resultado', 'resposta', 'matemática',
      '+', '-', '×', '÷', '*', '/', '=', 'raiz', 'potência', '%'
    ];
    
    const lowerMessage = message.toLowerCase();
    return mathKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  // Gera respostas para conceitos matemáticos
  static getMathConcept(message: string): string | null {
    const lowerMessage = message.toLowerCase();

    const concepts: { [key: string]: string } = {
      'adição': 'A adição é uma operação matemática que combina dois ou mais números para obter uma soma. Exemplo: 2 + 3 = 5',
      'subtração': 'A subtração é uma operação que encontra a diferença entre dois números. Exemplo: 5 - 2 = 3',
      'multiplicação': 'A multiplicação é uma operação que encontra o produto de dois números. É como uma soma repetida. Exemplo: 3 × 4 = 12',
      'divisão': 'A divisão é uma operação que encontra quantas vezes um número cabe em outro. Exemplo: 12 ÷ 3 = 4',
      'fração': 'Uma fração representa uma parte de um todo, escrita como numerador/denominador. Exemplo: 1/2 representa metade',
      'porcentagem': 'Porcentagem expressa uma parte de 100. O símbolo é %. Exemplo: 50% = 50/100 = 0,5',
      'raiz quadrada': 'A raiz quadrada de um número é o valor que, multiplicado por si mesmo, resulta no número original. √9 = 3',
      'potência': 'Uma potência representa multiplicação repetida. 2³ = 2 × 2 × 2 = 8',
      'equação': 'Uma equação é uma igualdade matemática com uma ou mais incógnitas. Exemplo: x + 2 = 5',
      'geometria': 'Geometria é o ramo da matemática que estuda formas, tamanhos, posições e propriedades de figuras',
    };

    for (const [concept, explanation] of Object.entries(concepts)) {
      if (lowerMessage.includes(concept)) {
        return explanation;
      }
    }

    return null;
  }
}