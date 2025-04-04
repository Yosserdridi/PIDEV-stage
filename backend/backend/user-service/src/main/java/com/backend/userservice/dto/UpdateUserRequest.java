package com.backend.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class UpdateUserRequest {
    @Size(max = 20)
    private String username;

    @Size(max = 50) @Email
    private String email;

    @Size(max = 120)
    private String password;

    private String firstName;
    private String lastName;
    private Set<String> roles;
}