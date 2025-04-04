import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/chatbot.model';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css']
})
export class MessageBubbleComponent {
  @Input() message!: Message;

  get isUser(): boolean {
    return this.message.role.toLowerCase() === 'user';
  }
}
