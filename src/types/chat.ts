export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface MathProblem {
  expression: string;
  result: number;
  steps?: string[];
}