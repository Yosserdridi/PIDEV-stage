// conversation-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Conversation } from 'src/app/models/chatbot.model';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent {
  @Input() conversations: Conversation[] = [];
  @Input() selectedConversationId: string | null = null;
  @Output() select = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onSelect(id: string) {
    this.select.emit(id);
  }

  onDelete(event: Event, id: string) {
    event.stopPropagation();
    this.delete.emit(id);
  }
}
