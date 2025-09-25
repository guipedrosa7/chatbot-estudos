import React from 'react';
import { Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface WelcomeMessageProps {
  onQuickQuestion: (question: string) => void;
}

export default function WelcomeMessage({ onQuickQuestion }: WelcomeMessageProps) {
  const quickQuestions = [
    { icon: Calculator, text: "Quanto é 15 + 27?", question: "Quanto é 15 + 27?" },
    { icon: BookOpen, text: "O que é uma fração?", question: "O que é uma fração?" },
    { icon: HelpCircle, text: "Como funciona a divisão?", question: "Como funciona a divisão?" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
        <Calculator className="text-blue-600" size={32} />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        MathBot
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Seu assistente pessoal de matemática! Posso ajudar com operações básicas, 
        explicar conceitos e resolver problemas matemáticos simples.
      </p>
      
      <div className="grid gap-3 w-full max-w-sm">
        <p className="text-sm font-semibold text-gray-700 mb-2">Perguntas rápidas:</p>
        {quickQuestions.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => onQuickQuestion(item.question)}
              className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-left"
            >
              <IconComponent size={20} className="text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}