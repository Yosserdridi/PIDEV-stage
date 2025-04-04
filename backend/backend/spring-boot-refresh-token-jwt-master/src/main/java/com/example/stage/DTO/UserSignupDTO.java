package com.example.stage.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignupDTO {
    private String lastName;
    private String firstName;
    private String username;
    private String email;
    private String password; // Mot de passe
    private boolean isAdmin; // Rôle d'administrateur (optionnel)
}