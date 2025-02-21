package com.example.back.Service;

import com.example.back.DTO.UserLoginDTO;
import com.example.back.DTO.UserSignupDTO;
import com.example.back.Exception.ResourceNotFoundException;
import com.example.back.Repository.UserRepository;
import com.example.back.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username); // Correction ici
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return user; // Retourne l'utilisateur trouvé
    }

    public User createUser(UserSignupDTO userSignupDTO) {
        User user = new User();
        user.setLastName(userSignupDTO.getLastName());
        user.setFirstName(userSignupDTO.getFirstName());
        user.setUsername(userSignupDTO.getUsername());
        user.setEmail(userSignupDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userSignupDTO.getPassword())); // Hachage du mot de passe
        user.setEnabled(true); // Activer par défaut
        user.setEmailVerified(false); // Vérification d'e-mail par défaut
        user.setRoles(Set.of("ROLE_USER")); // Assurez-vous d'ajouter un rôle par défaut
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll(); // Retourne tous les utilisateurs
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setUsername(userDetails.getUsername());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword())); // Hachez le mot de passe
        user.setEnabled(userDetails.isEnabled());
        // Mettez à jour d'autres champs selon vos besoins
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void validateUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(true); // Active l'utilisateur
        userRepository.save(user);
    }

    public void blockUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(false); // Désactive l'utilisateur
        userRepository.save(user);
    }

    public User loginUser(UserLoginDTO userLoginDTO) {
        User user = userRepository.findByUsername(userLoginDTO.getUsername());
        if (user != null && passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
            return user; // Connexion réussie
        }
        throw new RuntimeException("Invalid username or password");
    }
}