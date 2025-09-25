export class ChatResponseGenerator {
  static generateResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Saudações
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde')) {
      return 'Olá! 👋 Sou seu assistente de matemática. Posso ajudar você com operações básicas, conceitos matemáticos e resolver problemas simples. O que gostaria de saber?';
    }

    // Agradecimentos
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada') || lowerMessage.includes('valeu')) {
      return 'De nada! Estou sempre aqui para ajudar com suas dúvidas de matemática. 😊';
    }

    // Ajuda
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('como funciona')) {
      return 'Posso ajudar você com:\n\n• Operações básicas (+, -, ×, ÷)\n• Explicar conceitos matemáticos\n• Resolver expressões numéricas\n• Tirar dúvidas sobre matemática básica\n\nExemplos:\n"Quanto é 2 + 3?"\n"O que é uma fração?"\n"Resolve 15 × 4"';
    }

    // Despedidas
    if (lowerMessage.includes('tchau') || lowerMessage.includes('adeus') || lowerMessage.includes('até mais')) {
      return 'Até mais! Volte sempre que tiver dúvidas de matemática. Bons estudos! 📚';
    }

    return 'Desculpe, não entendi sua pergunta. Você pode me fazer perguntas sobre matemática, como operações básicas ou conceitos matemáticos. Digite "ajuda" para ver exemplos.';
  }

  static getRandomEncouragement(): string {
    const encouragements = [
      'Ótima pergunta!',
      'Vamos resolver isso juntos!',
      'Matemática pode ser divertida!',
      'Continue praticando!',
      'Você está indo bem!',
      'Excelente!',
    ];

    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }
}