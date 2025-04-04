package com.backend.chatbot.client;

import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service",
        url = "${application.config.users-url}",
        configuration = FeignConfig.class)
public interface UserServiceClient {
    @GetMapping("/username/{username}")
    UserDTO getUserByUsername(@PathVariable String username);
}