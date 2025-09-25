import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types/chat';
import { MathSolver } from './utils/mathSolver';
import { ChatResponseGenerator } from './utils/chatResponses';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    // Tenta resolver uma expressão matemática
    const mathProblem = MathSolver.solveMathExpression(userMessage);
    if (mathProblem) {
      const encouragement = ChatResponseGenerator.getRandomEncouragement();
      return `${encouragement}\n\n${mathProblem.expression} = ${mathProblem.result}`;
    }

    // Verifica se é uma pergunta matemática e tenta explicar conceitos
    if (MathSolver.isMathQuestion(userMessage)) {
      const concept = MathSolver.getMathConcept(userMessage);
      if (concept) {
        return concept;
      }
      
      // Tenta extrair números da mensagem para operações
      const numbers = userMessage.match(/\d+(?:\.\d+)?/g);
      if (numbers && numbers.length >= 2) {
        const operation = userMessage.toLowerCase();
        let result: number | null = null;
        let operationName = '';

        if (operation.includes('soma') || operation.includes('+')) {
          result = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
          operationName = 'soma';
        } else if (operation.includes('subtração') || operation.includes('-')) {
          result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
          operationName = 'subtração';
        } else if (operation.includes('multiplicação') || operation.includes('multiplica') || operation.includes('×') || operation.includes('*')) {
          result = numbers.reduce((acc, num) => acc * parseFloat(num), 1);
          operationName = 'multiplicação';
        } else if (operation.includes('divisão') || operation.includes('divide') || operation.includes('÷') || operation.includes('/')) {
          result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
          operationName = 'divisão';
        }

        if (result !== null) {
          return `Vamos resolver essa ${operationName}!\n\n${numbers.join(operationName === 'soma' ? ' + ' : operationName === 'subtração' ? ' - ' : operationName === 'multiplicação' ? ' × ' : ' ÷ ')} = ${result}`;
        }
      }
    }

    // Resposta padrão usando o sistema de respostas
    return ChatResponseGenerator.generateResponse(userMessage);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simula delay de processamento para melhor UX
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 500 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MathBot</h1>
              <p className="text-sm text-gray-500">Seu assistente de matemática</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {messages.length === 0 ? (
            <WelcomeMessage onQuickQuestion={handleQuickQuestion} />
          ) : (
            <div className="p-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3 mb-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;