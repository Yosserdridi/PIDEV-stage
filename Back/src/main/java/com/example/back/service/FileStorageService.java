package com.example.back.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {
    private static final String UPLOAD_DIR = "C:/Users/yosse_yqbk87k/Desktop/projet/uploads";

    public String storeFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Le fichier est vide !");
        }

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = UUID.randomUUID().toString() + extension;

        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        file.transferTo(filePath.toFile());

        return fileName;
    }
}
