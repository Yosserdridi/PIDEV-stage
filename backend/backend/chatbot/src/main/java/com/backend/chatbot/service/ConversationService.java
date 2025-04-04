package com.backend.chatbot.service;

import com.backend.chatbot.Repository.ConversationRepository;
import com.backend.chatbot.Repository.MessageRepository;
import com.backend.chatbot.model.Conversation;
import com.backend.chatbot.model.Message;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service

public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public ConversationService(ConversationRepository conversationRepository, MessageRepository messageRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional
    public Conversation createConversation(String userId, String title) {
        Conversation conversation = new Conversation();
        conversation.setId(UUID.randomUUID().toString());
        conversation.setUserId(userId);
        conversation.setTitle(title);
        return conversationRepository.save(conversation);
    }

    @Transactional(readOnly = true)
    public List<Conversation> getUserConversations(String userId) {
        return conversationRepository.findByUserIdOrderByUpdatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public Optional<Conversation> getConversationWithMessages(String conversationId) {
        return conversationRepository.findById(conversationId)
                .map(conversation -> {
                    List<Message> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
                    conversation.setMessages(messages);
                    return conversation;
                });
    }

    @Transactional
    public boolean deleteUserConversation(String conversationId, String userId) {
        return conversationRepository.findByIdAndUserId(conversationId, userId)
                .map(conversation -> {
                    conversationRepository.delete(conversation);
                    return true;
                })
                .orElse(false);
    }

    @Transactional
    public Message addMessage(String conversationId, Message.Role role, String content) {
        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setRole(role);
        message.setContent(content);

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new EntityNotFoundException("Conversation not found"));
        message.setConversation(conversation);

        return messageRepository.save(message);
    }
}