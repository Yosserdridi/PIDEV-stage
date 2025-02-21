package com.example.back.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDTO {
    private String username; // Nom d'utilisateur
    private String password; // Mot de passe
}