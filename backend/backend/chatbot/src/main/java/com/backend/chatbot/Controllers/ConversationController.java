package com.backend.chatbot.Controllers;

import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.client.UserServiceClient;
import com.backend.chatbot.model.Conversation;
import com.backend.chatbot.security.JwtUser;
import com.backend.chatbot.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot/conversations")

public class ConversationController {
    private final ConversationService conversationService;
    private final UserServiceClient userServiceClient;

    public ConversationController(ConversationService conversationService, UserServiceClient userServiceClient) {
        this.conversationService = conversationService;
        this.userServiceClient = userServiceClient;
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getConversations(@AuthenticationPrincipal JwtUser jwtUser) {
        UserDTO user = userServiceClient.getUserByUsername(jwtUser.getUsername());
        return ResponseEntity.ok(conversationService.getUserConversations(String.valueOf(user.getId())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conversation> getConversation(@PathVariable String id,
                                                        @AuthenticationPrincipal JwtUser jwtUser) {
        UserDTO user = userServiceClient.getUserByUsername(jwtUser.getUsername());
        return conversationService.getConversationWithMessages(id)
                .filter(c -> String.valueOf(c.getUserId()).equals(String.valueOf(user.getId())))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversation(@PathVariable String id,
                                                   @AuthenticationPrincipal JwtUser jwtUser) {
        UserDTO user = userServiceClient.getUserByUsername(jwtUser.getUsername());
        if (conversationService.deleteUserConversation(id, String.valueOf(user.getId()))) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}