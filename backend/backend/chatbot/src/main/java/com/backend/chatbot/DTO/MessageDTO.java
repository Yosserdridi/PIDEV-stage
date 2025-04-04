package com.backend.chatbot.DTO;

import com.backend.chatbot.model.Message;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.ZoneOffset;

@Getter
@Setter
@NoArgsConstructor
public class MessageDTO {
    private String role;
    @Size(max = 40000000, message = "Content must be less than 4000 characters")
    private String content;
    private Instant createdAt;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public static MessageDTO fromEntity(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setRole(message.getRole().name());
        dto.setContent(message.getContent());
        dto.setCreatedAt(message.getCreatedAt().toInstant(ZoneOffset.UTC));
        return dto;
    }
}
