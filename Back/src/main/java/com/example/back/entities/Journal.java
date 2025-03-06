package com.example.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;

    private String remark;

    private Boolean isValid;


    @OneToOne(cascade = CascadeType.ALL,mappedBy = "journal")
    @JsonIgnore
    private Files file;


    @OneToMany(cascade = CascadeType.ALL, mappedBy="journal")
    private Set<Task> tasks;




}
