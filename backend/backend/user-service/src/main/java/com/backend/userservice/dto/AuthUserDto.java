package com.backend.userservice.dto;

import com.backend.userservice.model.ERole;
import lombok.Data;

@Data
public class AuthUserDto {
    private String id;
    private String username;
    private String password;
    private ERole role;
}