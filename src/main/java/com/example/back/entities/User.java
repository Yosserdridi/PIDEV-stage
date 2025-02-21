package com.example.back.entities;

import com.yubico.webauthn.data.PublicKeyCredentialDescriptor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique

    private String lastName;
    private String firstName;
    private String username; // Nom d'utilisateur
    private String email;
    private String password; // Mot de passe
    private boolean isAdmin; // Rôle d'administrateur
    @Getter
    private boolean enabled; // Statut de l'utilisateur

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles; // Rôles de l'utilisateur (ADMIN, USER)

    private boolean emailVerified; // Vérification de l'email

    @Embedded
    private Authenticator authenticator;

    // Implémentation de UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> (GrantedAuthority) () -> role) // Convertit les rôles en GrantedAuthority
                .collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return username; // Retourne le nom d'utilisateur
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password; // Retourne le mot de passe
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Compte non expiré
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Compte non verrouillé
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Identifiants non expirés
    }

    @Override
    public boolean isEnabled() {
        return enabled; // Utilisateur activé
    }

    public void setAuthenticator(Authenticator authenticator) {
        this.authenticator = authenticator; // Méthode pour définir l'authentificateur
    }

    // Getters et Setters pour les autres propriétés
    public Long getId() {
        return id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    // Classe interne pour représenter l'authentificateur
    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Authenticator {
        private String id; // Identifiant de l'authentificateur
        private String credentialName; // Nom de l'identifiant de l'authentificateur

        public Authenticator(PublicKeyCredentialDescriptor keyId, String credentialName) {
            this.id = keyId.getId().toString();
            this.credentialName = credentialName;
        }
    }

    public com.yubico.webauthn.data.UserIdentity toUserIdentity() {
        // Implémentation de la conversion vers UserIdentity
        return null; // À personnaliser selon vos besoins
    }
}