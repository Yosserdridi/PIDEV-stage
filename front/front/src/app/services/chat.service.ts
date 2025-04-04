// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8222/api/chatbot';
  private currentConversation = new BehaviorSubject<Conversation | null>(null);
  currentConversation$ = this.currentConversation.asObservable();

  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations`);
  }

  getConversation(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/conversations/${id}`);
  }

  sendMessage(messages: Message[], conversationId?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, { messages, conversationId });
  }

  deleteConversation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/conversations/${id}`);
  }

  setCurrentConversation(conversation: Conversation | null) {
    this.currentConversation.next(conversation);
  }
}
