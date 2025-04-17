package com.example.back.service;

import com.example.back.entities.Files;
import com.example.back.entities.User;
import com.example.back.repository.FileRepository;
import com.example.back.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void ajouterNote(User userId, float note) {
        // Sauvegarder la note dans la table "file"
        Files file = new Files();
        file.setUser(userId);
        file.setNote(note);
        fileRepository.save(file);

        // Mettre à jour l'étudiant comme étant disponible pour la soutenance
        User user = userRepository.findById(userId.getId()).orElseThrow();
        user.setDisponiblePourSoutenance(true);
        userRepository.save(user);
    }
}
