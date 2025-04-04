package com.backend.chatbot.service;

import com.backend.chatbot.DTO.ChatRequest;
import com.backend.chatbot.DTO.ChatResponse;
import com.backend.chatbot.DTO.MessageDTO;
import com.backend.chatbot.DTO.OpenRouterResponse;
import com.backend.chatbot.model.Conversation;
import com.backend.chatbot.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private static final String OPEN_ROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
    private static final String DEFAULT_CHAT_MODEL = "deepseek/deepseek-chat:free";
    private static final String AUTH_HEADER = "Authorization";
    private static final String AUTH_TOKEN = "Bearer " + "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";

    private final ConversationService conversationService;
    private final WebClient.Builder webClientBuilder;

    public ChatService(ConversationService conversationService, WebClient.Builder webClientBuilder) {
        this.conversationService = conversationService;
        this.webClientBuilder = webClientBuilder;
    }

    public ChatResponse handleChatRequest(ChatRequest request, String userId) {
        Conversation conversation = validateAndGetConversation(request, userId);
        OpenRouterResponse response = callOpenRouterApi(request);
        saveMessages(request, response, conversation);
        return createResponse(response, conversation);
    }

    private Conversation validateAndGetConversation(ChatRequest request, String userId) {
        return request.getConversationId() != null
                ? getExistingConversation(request.getConversationId(), userId)
                : createNewConversation(request, userId);
    }

    private Conversation getExistingConversation(String conversationId, String userId) {
        return conversationService.getConversationWithMessages(conversationId)
                .filter(c -> c.getUserId().equals(userId))
                .orElseThrow(() -> new AccessDeniedException("Conversation access denied"));
    }

    private Conversation createNewConversation(ChatRequest request, String userId) {
        String title = getChatRequestTitle(request);
        return conversationService.createConversation(userId, title);
    }

    private String getChatRequestTitle(ChatRequest request) {
        return request.getMessages().stream()
                .filter(m -> Message.Role.USER.equals(m.getRole()))
                .reduce((first, second) -> second)
                .map(msg -> truncateContent(msg.getContent(), 50))
                .orElse("New Chat");
    }

    private String truncateContent(String content, int maxLength) {
        if (content == null) return "";

        if (content.length() > maxLength) {
            log.warn("Truncating content from {} to {} characters", content.length(), maxLength);
            return content.substring(0, maxLength - 3) + "...";
        }
        return content;
    }

    private OpenRouterResponse callOpenRouterApi(ChatRequest request) {
        return webClientBuilder.build()
                .post()
                .uri(OPEN_ROUTER_API_URL)
                .header(AUTH_HEADER, AUTH_TOKEN)
                .bodyValue(Map.of(
                        "model", request.getModel() != null ? request.getModel() : DEFAULT_CHAT_MODEL,
                        "messages", request.getMessages()
                ))
                .retrieve()
                .onStatus(HttpStatusCode::isError, response ->
                        response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("OpenRouter error: " + body))
                )
                .bodyToMono(OpenRouterResponse.class)
                .block();
    }

    private void saveMessages(ChatRequest request, OpenRouterResponse response, Conversation conversation) {
        try {
            final int MAX_CONTENT_LENGTH = 4000000;
            log.debug("Saving {} user messages", request.getMessages().size());
            request.getMessages().forEach(message -> {
                String truncatedContent = truncateContent(message.getContent(), MAX_CONTENT_LENGTH);
                conversationService.addMessage(
                        conversation.getId(),
                        Message.Role.valueOf(message.getRole().toUpperCase()),
                        truncatedContent
                );
            });

            // Save assistant response
            if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
                OpenRouterResponse.Message responseMessage = response.getChoices().get(0).getMessage();
                String assistantContent = truncateContent(responseMessage.getContent(), MAX_CONTENT_LENGTH);

                conversationService.addMessage(
                        conversation.getId(),
                        Message.Role.ASSISTANT,
                        assistantContent
                );
            }
            // Save ASSISTANT response
            if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
                OpenRouterResponse.Message responseMessage = response.getChoices().get(0).getMessage();
                log.debug("Saving assistant response: {}", responseMessage.getContent());

                try {
                    addAssistantMessage(conversation, responseMessage);
                } catch (IllegalArgumentException e) {
                    log.error("Invalid assistant role: {}", responseMessage.getRole());
                    throw new RuntimeException("Invalid assistant role: " + responseMessage.getRole());
                }
            } else {
                log.warn("No assistant response to save");
            }
        } catch (Exception e) {
            log.error("Failed to save messages: {}", e.getMessage());
            throw new RuntimeException("Message saving failed: " + e.getMessage(), e);
        }
    }
    private void addAssistantMessage(Conversation conversation, OpenRouterResponse.Message responseMessage) {
        Message assistantMessage = new Message();
        assistantMessage.setRole(Message.Role.valueOf(responseMessage.getRole().toUpperCase()));
        assistantMessage.setContent(responseMessage.getContent());
        conversationService.addMessage(
                conversation.getId(),
                Message.Role.ASSISTANT,
                assistantMessage.getContent()
        );
    }

    private ChatResponse createResponse(OpenRouterResponse openRouterResponse, Conversation conversation) {
        ChatResponse response = new ChatResponse();
        response.setConversationId(conversation.getId());
        response.setCreated(openRouterResponse.getCreated());
        response.setChoices(createChoices(openRouterResponse));
        return response;
    }

    private List<ChatResponse.Choice> createChoices(OpenRouterResponse openRouterResponse) {
        return openRouterResponse.getChoices().stream()
                .map(this::createChoice)
                .collect(Collectors.toList());
    }

    private ChatResponse.Choice createChoice(OpenRouterResponse.Choice openRouterChoice) {
        ChatResponse.Choice choice = new ChatResponse.Choice();
        choice.setIndex(openRouterChoice.getIndex());
        choice.setMessage(createMessageDTO(openRouterChoice.getMessage()));
        return choice;
    }

    private MessageDTO createMessageDTO(OpenRouterResponse.Message message) {
        MessageDTO messageDto = new MessageDTO();
        messageDto.setRole(message.getRole());
        messageDto.setContent(message.getContent());
        return messageDto;
    }
}