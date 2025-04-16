package com.example.back.services;


import com.example.back.entities.Files;
import com.example.back.entities.Journal;
import com.example.back.entities.Task;
import com.example.back.repository.FileRepository;
import com.example.back.repository.JournalRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.nio.file.Files.createDirectories;

@Service
@AllArgsConstructor
public class FileServiceImpl implements FileService {

    @Autowired
    FileRepository fileRepository;
    JournalRepository journalRepository;



    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    public FileServiceImpl() {
        try {
            java.nio.file.Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create the directory for file storage.", ex);
        }
    }

    public String saveFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            java.nio.file.Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store the file. Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }

        }



    public List<Files> getAllFiles() {
        return fileRepository.getAllFiles(); // Use the native query method
    }

    public Files getFileById(Long id) {
        return fileRepository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
    }

    public void deleteFileById(Long id) {
        fileRepository.deleteById(id);
    }






    }




