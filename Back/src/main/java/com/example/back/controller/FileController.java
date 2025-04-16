package com.example.back.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class FileController {
    private static final String UPLOAD_DIR = "C:/Users/yosse_yqbk87k/Desktop/projet/uploads";
    // Définition du répertoire où les fichiers sont stockés.

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
        Resource resource = new UrlResource(filePath.toUri());
        // Crée un objet Resource qui représente le fichier à partir du chemin.

        if (resource.exists() && resource.isReadable()) {
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg")  // Change en fonction du type
                    .header("Content-Disposition", "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
