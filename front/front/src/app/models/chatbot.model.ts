export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Date;
}

export interface ChatResponse {
  conversationId: string;
  choices: Choice[];
  created: Date;
}

interface Choice {
  message: Message;
  index: number;
}
