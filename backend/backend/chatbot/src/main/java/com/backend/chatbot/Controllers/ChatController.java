package com.backend.chatbot.Controllers;

import com.backend.chatbot.DTO.ChatRequest;
import com.backend.chatbot.DTO.ChatResponse;
import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.client.UserServiceClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import com.backend.chatbot.security.JwtUser;
import com.backend.chatbot.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableFeignClients(basePackages = "com.backend.chatbot.client")
@RestController
@RequestMapping("/api/chatbot/chat")

public class ChatController {
    private final ChatService chatService;
    private final UserServiceClient userServiceClient;

    public ChatController(ChatService chatService, UserServiceClient userServiceClient) {
        this.chatService = chatService;
        this.userServiceClient = userServiceClient;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request,
                                             @AuthenticationPrincipal JwtUser jwtUser) {
        // Get full user details from user service
        UserDTO user = userServiceClient.getUserByUsername(jwtUser.getUsername());

        return ResponseEntity.ok(chatService.handleChatRequest(request, String.valueOf(user.getId())));
    }
}