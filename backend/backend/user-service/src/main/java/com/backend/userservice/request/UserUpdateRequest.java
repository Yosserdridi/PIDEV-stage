package com.backend.userservice.request;

import com.backend.userservice.model.UserDetails;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class UserUpdateRequest {
    @NotBlank(message = "Id is required")
    private String id;
    private String username;
    private String password;
    private UserDetails userDetails;
}
