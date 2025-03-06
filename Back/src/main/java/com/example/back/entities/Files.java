package com.example.back.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Report;
    private String internship_Certifcate;


    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private  Journal journal;


    @OneToOne(cascade = CascadeType.ALL,mappedBy = "files")
    @JsonIgnore
    private SummerInternship summerInternship;


}
